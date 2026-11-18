import { Component, inject, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionStorage } from '../session-storage';

@Component({
  selector: 'app-add-seeds',
  standalone: false,
  templateUrl: './add-seeds.html',
  styleUrl: './add-seeds.scss',
})
export class AddSeeds implements OnInit {

  // =====================================================
  // SESSION STORAGE
  // =====================================================

  private sessionStorage = inject(SessionStorage);

  readonly SEED_KEY = 'seedData';

  private cd = inject(ChangeDetectorRef);


  // =====================================================
  // FORM
  // =====================================================

  submitted = false;

  imageError = false;

  seed = {
    seedName: '',
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
        this.SEED_KEY
      );

      // No saved data
      if (!data) {
        return;
      }


      // -----------------------------------------------
      // Restore seed data
      // -----------------------------------------------

      this.seed = {
        seedName: data.seedName || '',
        type: data.type || '',
        brand: data.brand || '',
        quantity: data.quantity ?? null,
        price: data.price ?? null,
        expiryDate: data.expiryDate || '',
        description: data.description || ''
      };


      // -----------------------------------------------
      // Restore Image 1
      // -----------------------------------------------

      if (data.image1) {

        this.imagePreview1 = data.image1;

        this.image1 = await this.base64ToFile(
          data.image1,
          'seed-image-1'
        );
      }


      // -----------------------------------------------
      // Restore Image 2
      // -----------------------------------------------

      if (data.image2) {

        this.imagePreview2 = data.image2;

        this.image2 = await this.base64ToFile(
          data.image2,
          'seed-image-2'
        );
      }


      // -----------------------------------------------
      // Update image validation
      // -----------------------------------------------

      this.imageError = !(this.image1 && this.image2);


      // -----------------------------------------------
      // Refresh Angular view
      // -----------------------------------------------

      this.cd.detectChanges();

    } catch (error) {

      console.error(
        'Error loading seed session data:',
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
    // Update image validation
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
      // Save everything
      // -----------------------------------------------

      this.sessionStorage.setItem(
        this.SEED_KEY,
        {
          ...this.seed,

          image1: image1Base64,

          image2: image2Base64
        }
      );

    } catch (error) {

      console.error(
        'Error saving seed session:',
        error
      );
    }
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
  // SEED FIELD CHANGE
  // =====================================================

  async onSeedChange(): Promise<void> {

    await this.saveSession();
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
      // Save latest session data
      // ---------------------------------------------

      await this.saveSession();


      // ---------------------------------------------
      // Prepare seed data
      // ---------------------------------------------

      const seedData = {

        ...this.seed,

        image1: this.image1
          ? await this.fileToBase64(
              this.image1
            )
          : this.imagePreview1,

        image2: this.image2
          ? await this.fileToBase64(
              this.image2
            )
          : this.imagePreview2
      };


      console.log(
        'Uploading seed:',
        seedData
      );


      // ---------------------------------------------
      // API UPLOAD
      // ---------------------------------------------

      const uploadSuccess =
        await this.uploadSeed(
          seedData
        );


      // ---------------------------------------------
      // UPLOAD SUCCESS
      // ---------------------------------------------

      if (uploadSuccess) {

        // -------------------------------------------
        // Clear session ONLY after successful upload
        // -------------------------------------------

        this.sessionStorage.removeItem(
          this.SEED_KEY
        );


        // -------------------------------------------
        // Clear seed
        // -------------------------------------------

        this.seed = {

          seedName: '',
          type: '',
          brand: '',
          quantity: null,
          price: null,
          expiryDate: '',
          description: ''
        };


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
          'Seed uploaded successfully.'
        );

        return;
      }


      // ---------------------------------------------
      // UPLOAD FAILED
      // ---------------------------------------------

      alert(
        'Seed upload failed. Your data has been kept.'
      );

    } catch (error) {

      console.error(
        'Seed upload error:',
        error
      );


      // ---------------------------------------------
      // DO NOT CLEAR SESSION
      // ---------------------------------------------

      alert(
        'Seed upload failed. Your data has been saved so you can retry.'
      );
    }
  }


  // =====================================================
  // UPLOAD SEED
  // =====================================================

  async uploadSeed(
    seedData: any
  ): Promise<boolean> {

    /*
     * Replace this with your actual API call.
     *
     * Example:
     *
     * const response =
     *   await this.seedService.addSeed(seedData);
     *
     * return response.success === true;
     */

    console.log(
      'Seed ready for upload:',
      seedData
    );


    // TEMPORARY
    // Replace with your real API response.
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
