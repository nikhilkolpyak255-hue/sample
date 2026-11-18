import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef, inject } from '@angular/core';
import { SessionStorage } from '../session-storage';
@Component({
  selector: 'app-add-waste',
  standalone: false,
  templateUrl: './add-waste.html',
  styleUrl: './add-waste.scss',
})
export class AddWaste {
  // =====================================================
  // SESSION STORAGE
  // =====================================================

  private sessionStorage = inject(SessionStorage);

  readonly WASTE_KEY = 'wasteData';

  private cd = inject(ChangeDetectorRef);


  // =====================================================
  // FORM
  // =====================================================

  submitted = false;
  imageError = false;

  waste = {
    wasteName: '',
    category: '',
    quantity: null as number | null,
    price: null as number | null,
    location: '',
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

      const data = this.sessionStorage.getItem<any>(
        this.WASTE_KEY
      );

      // No saved data
      if (!data) {
        return;
      }


      // =================================================
      // RESTORE WASTE DATA
      // =================================================

      this.waste = {
        wasteName: data.wasteName || '',
        category: data.category || '',
        quantity:
          data.quantity !== null &&
          data.quantity !== undefined &&
          data.quantity !== ''
            ? Number(data.quantity)
            : null,

        price:
          data.price !== null &&
          data.price !== undefined &&
          data.price !== ''
            ? Number(data.price)
            : null,

        location: data.location || '',
        description: data.description || ''
      };


      // =================================================
      // RESTORE IMAGE 1
      // =================================================

      if (data.image1) {

        this.imagePreview1 = data.image1;

        this.image1 = await this.base64ToFile(
          data.image1,
          'waste-image-1'
        );
      }


      // =================================================
      // RESTORE IMAGE 2
      // =================================================

      if (data.image2) {

        this.imagePreview2 = data.image2;

        this.image2 = await this.base64ToFile(
          data.image2,
          'waste-image-2'
        );
      }


      // Update image validation
      this.imageError = !(this.image1 && this.image2);

      // Refresh Angular view
      this.cd.detectChanges();

    } catch (error) {

      console.error(
        'Error loading waste session data:',
        error
      );
    }
  }


  // =====================================================
  // FILE SELECT
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

    this.previewImage(file, index);
  }


  // =====================================================
  // PREVIEW IMAGE
  // =====================================================

  async previewImage(
    file: File,
    index: number
  ): Promise<void> {

    // Validate image
    if (!file.type.startsWith('image/')) {

      alert('Only image files are allowed.');

      return;
    }


    // Create preview
    const imageUrl =
      URL.createObjectURL(file);


    // =================================================
    // IMAGE 1
    // =================================================

    if (index === 1) {

      // Remove old blob URL
      if (
        this.imagePreview1 &&
        this.imagePreview1.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.imagePreview1
        );
      }

      this.image1 = file;
      this.imagePreview1 = imageUrl;
    }


    // =================================================
    // IMAGE 2
    // =================================================

    else if (index === 2) {

      // Remove old blob URL
      if (
        this.imagePreview2 &&
        this.imagePreview2.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.imagePreview2
        );
      }

      this.image2 = file;
      this.imagePreview2 = imageUrl;
    }


    // Update validation
    this.imageError =
      !(this.image1 && this.image2);


    // Save session
    await this.saveSession();

    // Refresh Angular
    this.cd.detectChanges();
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


    const file =
      event.dataTransfer?.files?.[0];

    if (!file) {
      return;
    }


    this.previewImage(
      file,
      index
    );
  }


  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  async removeImage(
    index: number
  ): Promise<void> {

    // =================================================
    // IMAGE 1
    // =================================================

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


    // =================================================
    // IMAGE 2
    // =================================================

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


    // Update validation
    this.imageError =
      !(this.image1 && this.image2);


    // Update session
    await this.saveSession();

    // Refresh view
    this.cd.detectChanges();
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
  // SAVE SESSION
  // =====================================================

  async saveSession(): Promise<void> {

    try {

      // =================================================
      // IMAGE 1
      // =================================================

      const image1Base64 =
        this.image1
          ? await this.fileToBase64(
              this.image1
            )
          : this.imagePreview1;


      // =================================================
      // IMAGE 2
      // =================================================

      const image2Base64 =
        this.image2
          ? await this.fileToBase64(
              this.image2
            )
          : this.imagePreview2;


      // =================================================
      // SAVE EVERYTHING
      // =================================================

      this.sessionStorage.setItem(
        this.WASTE_KEY,
        {
          ...this.waste,

          image1: image1Base64,

          image2: image2Base64
        }
      );

    } catch (error) {

      console.error(
        'Error saving waste session:',
        error
      );
    }
  }


  // =====================================================
  // FORM FIELD CHANGE
  // =====================================================

  async onWasteChange(): Promise<void> {

    await this.saveSession();
  }


  // =====================================================
  // SUBMIT
  // =====================================================

  async submit(
    form: NgForm
  ): Promise<void> {

    this.submitted = true;


    // =================================================
    // IMAGE VALIDATION
    // =================================================

    this.imageError =
      !(this.image1 && this.image2);


    // =================================================
    // FORM VALIDATION
    // =================================================

    if (
      form.invalid ||
      this.imageError
    ) {

      alert(
        'Please fill all the field'
      );

      form.control.markAllAsTouched();

      return;
    }


    try {

      // =================================================
      // SAVE LATEST DATA
      // =================================================

      await this.saveSession();


      // =================================================
      // PREPARE FORM DATA
      // =================================================

      const formData =
        new FormData();

      formData.append(
        'wasteName',
        this.waste.wasteName
      );

      formData.append(
        'category',
        this.waste.category
      );

      formData.append(
        'quantity',
        String(this.waste.quantity)
      );

      formData.append(
        'price',
        String(this.waste.price)
      );

      formData.append(
        'location',
        this.waste.location
      );

      formData.append(
        'description',
        this.waste.description
      );

      formData.append(
        'image1',
        this.image1!
      );

      formData.append(
        'image2',
        this.image2!
      );


      // =================================================
      // CONSOLE
      // =================================================

      console.log(
        'Waste Submitted'
      );

      console.log(
        this.waste
      );

      console.log(
        'FormData:',
        formData
      );


      // =================================================
      // SUCCESS
      // =================================================

      alert(
        'Waste Uploaded Successfully'
      );


      // =================================================
      // CLEAR SESSION
      // =================================================

      this.sessionStorage.removeItem(
        this.WASTE_KEY
      );


      // =================================================
      // RESET FORM
      // =================================================

      form.resetForm();


      this.waste = {
        wasteName: '',
        category: '',
        quantity: null,
        price: null,
        location: '',
        description: ''
      };


      // =================================================
      // CLEAR IMAGES
      // =================================================

      this.clearImagePreview(1);
      this.clearImagePreview(2);

      this.image1 = null;
      this.image2 = null;

      this.imagePreview1 = null;
      this.imagePreview2 = null;


      // =================================================
      // RESET STATES
      // =================================================

      this.submitted = false;
      this.imageError = false;


      // Refresh Angular
      this.cd.detectChanges();

    } catch (error) {

      console.error(
        'Waste submission error:',
        error
      );

      alert(
        'Waste upload failed. Your data has been saved so you can retry.'
      );
    }
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

    } else if (index === 2) {

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
