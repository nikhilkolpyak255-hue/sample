
import { Component, inject, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionStorage } from '../session-storage';

@Component({
  selector: 'app-add-fertilizers',
  standalone: false,
  templateUrl: './add-fertilizers.html',
  styleUrl: './add-fertilizers.scss',
})
export class AddFertilizers implements OnInit {

  // =====================================================
  // SESSION STORAGE
  // =====================================================

  private sessionStorage = inject(SessionStorage);

  readonly FERTILIZER_KEY = 'fertilizerData';

  private cd = inject(ChangeDetectorRef);


  // =====================================================
  // FORM
  // =====================================================

  submitted = false;

  fertilizer = {
    fertilizerName: '',
    type: '',
    brand: '',
    quantity: null as number | null,
    price: null as number | null,
    expiryDate: '',
    description: ''
  };


  // =====================================================
  // IMAGES
  // =====================================================

  image1: File | null = null;
  image2: File | null = null;


  // =====================================================
  // IMAGE PREVIEWS
  // =====================================================

  imagePreview1: string | null = null;
  imagePreview2: string | null = null;

  imageError = false;


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {
    this.loadSession();
  }


  // =====================================================
  // LOAD SESSION
  // =====================================================

  async loadSession(): Promise<void> {

    try {

      const data =
        this.sessionStorage.getItem<any>(
          this.FERTILIZER_KEY
        );

      // No saved data
      if (!data) {
        return;
      }


      // -----------------------------------------------
      // Restore fertilizer data
      // -----------------------------------------------

      this.fertilizer = {

        fertilizerName:
          data.fertilizerName || '',

        type:
          data.type || '',

        brand:
          data.brand || '',

        quantity:
          data.quantity ?? null,

        price:
          data.price ?? null,

        expiryDate:
          data.expiryDate || '',

        description:
          data.description || ''
      };


      // -----------------------------------------------
      // Restore Image 1
      // -----------------------------------------------

      if (data.image1) {

        this.imagePreview1 =
          data.image1;

        this.image1 =
          await this.base64ToFile(
            data.image1,
            'fertilizer-image-1'
          );
      }


      // -----------------------------------------------
      // Restore Image 2
      // -----------------------------------------------

      if (data.image2) {

        this.imagePreview2 =
          data.image2;

        this.image2 =
          await this.base64ToFile(
            data.image2,
            'fertilizer-image-2'
          );
      }


      // -----------------------------------------------
      // Update image validation
      // -----------------------------------------------

      this.imageError =
        !(this.image1 && this.image2);


      // -----------------------------------------------
      // Refresh Angular
      // -----------------------------------------------

      this.cd.detectChanges();

    } catch (error) {

      console.error(
        'Error loading fertilizer session data:',
        error
      );
    }
  }


  // =====================================================
  // BROWSE IMAGE
  // =====================================================

  onFileSelected(
    event: Event,
    index: number
  ): void {

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) {
      return;
    }

    this.previewImage(
      file,
      index
    );
  }


  // =====================================================
  // FILE TO BASE64
  // =====================================================

  fileToBase64(
    file: File
  ): Promise<string> {

    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();

        reader.onload = () => {

          resolve(
            reader.result as string
          );
        };

        reader.onerror = () => {

          reject(
            reader.error
          );
        };

        reader.readAsDataURL(file);
      }
    );
  }


  // =====================================================
  // BASE64 TO FILE
  // =====================================================

  async base64ToFile(
    base64: string,
    fileName: string
  ): Promise<File> {

    const response =
      await fetch(base64);

    const blob =
      await response.blob();

    return new File(
      [blob],
      fileName,
      {
        type: blob.type
      }
    );
  }


  // =====================================================
  // DRAG OVER
  // =====================================================

  onDragOver(
    event: DragEvent
  ): void {

    event.preventDefault();
    event.stopPropagation();
  }


  // =====================================================
  // DRAG LEAVE
  // =====================================================

  onDragLeave(
    event: DragEvent
  ): void {

    event.preventDefault();
    event.stopPropagation();
  }


  // =====================================================
  // DROP IMAGE
  // =====================================================

  onDrop(
    event: DragEvent,
    index: number
  ): void {

    event.preventDefault();
    event.stopPropagation();


    if (
      !event.dataTransfer?.files?.length
    ) {
      return;
    }


    const file =
      event.dataTransfer.files[0];


    this.previewImage(
      file,
      index
    );
  }


  // =====================================================
  // PREVIEW IMAGE
  // =====================================================

  async previewImage(
    file: File,
    index: number
  ): Promise<void> {

    // -----------------------------------------------
    // Validate image
    // -----------------------------------------------

    if (!file.type.startsWith('image/')) {

      alert(
        'Only image files are allowed.'
      );

      return;
    }


    // -----------------------------------------------
    // Create preview
    // -----------------------------------------------

    const imageUrl =
      URL.createObjectURL(file);


    // -----------------------------------------------
    // IMAGE 1
    // -----------------------------------------------

    if (index === 1) {

      // Revoke old blob URL
      if (
        this.imagePreview1 &&
        this.imagePreview1.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.imagePreview1
        );
      }


      this.image1 = file;

      this.imagePreview1 =
        imageUrl;
    }


    // -----------------------------------------------
    // IMAGE 2
    // -----------------------------------------------

    else if (index === 2) {

      // Revoke old blob URL
      if (
        this.imagePreview2 &&
        this.imagePreview2.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.imagePreview2
        );
      }


      this.image2 = file;

      this.imagePreview2 =
        imageUrl;
    }


    // -----------------------------------------------
    // Update validation
    // -----------------------------------------------

    this.imageError =
      !(this.image1 && this.image2);


    // -----------------------------------------------
    // Save session
    // -----------------------------------------------

    await this.saveSession();


    // -----------------------------------------------
    // Refresh Angular
    // -----------------------------------------------

    this.cd.detectChanges();
  }


  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  async removeImage(
    index: number
  ): Promise<void> {

    // -----------------------------------------------
    // IMAGE 1
    // -----------------------------------------------

    if (index === 1) {

      if (
        this.imagePreview1 &&
        this.imagePreview1.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.imagePreview1
        );
      }


      this.image1 = null;

      this.imagePreview1 = null;
    }


    // -----------------------------------------------
    // IMAGE 2
    // -----------------------------------------------

    else if (index === 2) {

      if (
        this.imagePreview2 &&
        this.imagePreview2.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.imagePreview2
        );
      }


      this.image2 = null;

      this.imagePreview2 = null;
    }


    // -----------------------------------------------
    // Update validation
    // -----------------------------------------------

    this.imageError =
      !(this.image1 && this.image2);


    // -----------------------------------------------
    // Update session
    // -----------------------------------------------

    await this.saveSession();


    // -----------------------------------------------
    // Refresh Angular
    // -----------------------------------------------

    this.cd.detectChanges();
  }


  // =====================================================
  // SAVE SESSION
  // =====================================================

  async saveSession(): Promise<void> {

    try {

      // -----------------------------------------------
      // Image 1
      // -----------------------------------------------

      const image1Base64 =
        this.image1
          ? await this.fileToBase64(
              this.image1
            )
          : this.imagePreview1;


      // -----------------------------------------------
      // Image 2
      // -----------------------------------------------

      const image2Base64 =
        this.image2
          ? await this.fileToBase64(
              this.image2
            )
          : this.imagePreview2;


      // -----------------------------------------------
      // Save fertilizer + images
      // -----------------------------------------------

      this.sessionStorage.setItem(
        this.FERTILIZER_KEY,
        {
          ...this.fertilizer,

          image1:
            image1Base64,

          image2:
            image2Base64
        }
      );

    } catch (error) {

      console.error(
        'Error saving fertilizer session:',
        error
      );
    }
  }


  // =====================================================
  // FERTILIZER FIELD CHANGE
  // =====================================================

  async onFertilizerChange(): Promise<void> {

    await this.saveSession();
  }


  // =====================================================
  // PREVENT NEGATIVE VALUES
  // =====================================================

  preventNegative(
    event: KeyboardEvent
  ): void {

    if (
      event.key === '-' ||
      event.key === '+' ||
      event.key === 'e' ||
      event.key === 'E'
    ) {

      event.preventDefault();
    }
  }


  // =====================================================
  // SUBMIT
  // =====================================================

  async submit(
    form: NgForm
  ): Promise<void> {

    this.submitted = true;


    // -----------------------------------------------
    // Validate images
    // -----------------------------------------------

    this.imageError =
      !(this.image1 && this.image2);


    // -----------------------------------------------
    // Validate form
    // -----------------------------------------------

    if (
      form.invalid ||
      !this.image1 ||
      !this.image2
    ) {

      alert(
        'Please fill all the field'
      );

      form.control.markAllAsTouched();

      return;
    }


    try {

      // ---------------------------------------------
      // Save latest session
      // ---------------------------------------------

      await this.saveSession();


      // ---------------------------------------------
      // Create FormData
      // ---------------------------------------------

      const formData =
        new FormData();


      formData.append(
        'fertilizerName',
        this.fertilizer.fertilizerName
      );


      formData.append(
        'type',
        this.fertilizer.type
      );


      formData.append(
        'brand',
        this.fertilizer.brand
      );


      formData.append(
        'quantity',
        String(this.fertilizer.quantity)
      );


      formData.append(
        'price',
        String(this.fertilizer.price)
      );


      formData.append(
        'expiryDate',
        this.fertilizer.expiryDate
      );


      formData.append(
        'description',
        this.fertilizer.description
      );


      formData.append(
        'image1',
        this.image1!
      );


      formData.append(
        'image2',
        this.image2!
      );


      console.log(
        'Fertilizer FormData:',
        formData
      );


      // ---------------------------------------------
      // API UPLOAD
      // ---------------------------------------------

      const uploadSuccess =
        await this.uploadFertilizer(
          formData
        );


      // ---------------------------------------------
      // SUCCESS
      // ---------------------------------------------

      if (uploadSuccess) {

        // Clear session ONLY after successful upload

        this.sessionStorage.removeItem(
          this.FERTILIZER_KEY
        );


        // -------------------------------------------
        // Clear images
        // -------------------------------------------

        this.clearImagePreview(1);
        this.clearImagePreview(2);


        this.image1 = null;
        this.image2 = null;

        this.imagePreview1 = null;
        this.imagePreview2 = null;


        // -------------------------------------------
        // Reset fertilizer
        // -------------------------------------------

        this.fertilizer = {

          fertilizerName: '',
          type: '',
          brand: '',
          quantity: null,
          price: null,
          expiryDate: '',
          description: ''
        };


        // -------------------------------------------
        // Reset form
        // -------------------------------------------

        form.resetForm();

        this.submitted = false;

        this.imageError = false;


        // -------------------------------------------
        // Refresh Angular
        // -------------------------------------------

        this.cd.detectChanges();


        alert(
          'Fertilizer Uploaded Successfully'
        );

        return;
      }


      // ---------------------------------------------
      // UPLOAD FAILED
      // ---------------------------------------------

      alert(
        'Fertilizer upload failed. Your data has been kept.'
      );

    } catch (error) {

      console.error(
        'Fertilizer upload error:',
        error
      );


      // DO NOT CLEAR SESSION

      alert(
        'Fertilizer upload failed. Your data has been saved so you can retry.'
      );
    }
  }


  // =====================================================
  // UPLOAD FERTILIZER
  // =====================================================

  async uploadFertilizer(
    formData: FormData
  ): Promise<boolean> {

    /*
     * Replace this section with your actual API call.
     *
     * Example:
     *
     * const response =
     *   await this.fertilizerService
     *     .addFertilizer(formData);
     *
     * return response.success === true;
     */


    console.log(
      'Fertilizer ready for upload:',
      formData
    );


    // TEMPORARY
    // Replace with your actual API response.
    return true;
  }


  // =====================================================
  // CLEAR IMAGE PREVIEW
  // =====================================================

  private clearImagePreview(
    index: number
  ): void {

    if (index === 1) {

      if (
        this.imagePreview1 &&
        this.imagePreview1.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.imagePreview1
        );
      }

    }

    else if (index === 2) {

      if (
        this.imagePreview2 &&
        this.imagePreview2.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.imagePreview2
        );
      }
    }
  }
}
