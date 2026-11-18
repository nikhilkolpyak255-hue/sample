import {
  Component,
  ChangeDetectorRef,
  inject,
  OnInit
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { SessionStorage } from '../session-storage';


@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss'
})
export class AddProduct implements OnInit {


  // =====================================================
  // SERVICES
  // =====================================================

  private sessionStorage = inject(SessionStorage);

  private cd = inject(ChangeDetectorRef);


  // =====================================================
  // SESSION STORAGE KEY
  // =====================================================

  readonly PRODUCT_KEY = 'productData';


  // =====================================================
  // FORM STATE
  // =====================================================

  submitted = false;

  loading = false;

  imageError = false;


  // =====================================================
  // PRODUCT DATA
  // =====================================================

  product = {

    name: '',

    type: '',

    quantity: '',

    quality: '',

    price: '',

    description: ''

  };


  // =====================================================
  // IMAGE FILES
  // =====================================================

  image1: File | null = null;

  image2: File | null = null;


  // =====================================================
  // IMAGE PREVIEWS
  // =====================================================

  preview1: string | null = null;

  preview2: string | null = null;


  // =====================================================
  // DRAG STATE
  // =====================================================

  dragging1 = false;

  dragging2 = false;


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
          this.PRODUCT_KEY
        );


      // -------------------------------------------------
      // No saved data
      // -------------------------------------------------

      if (!data) {

        console.log(
          'No product session data found.'
        );

        return;

      }


      // =================================================
      // RESTORE PRODUCT FIELDS
      // =================================================

      this.product = {

        name:
          data.name || '',

        type:
          data.type || '',

        quantity:
          data.quantity || '',

        quality:
          data.quality || '',

        price:
          data.price || '',

        description:
          data.description || ''

      };


      // =================================================
      // RESTORE IMAGE 1
      // =================================================

      if (data.image1) {

        this.preview1 =
          data.image1;

        try {

          this.image1 =
            await this.base64ToFile(
              data.image1,
              'product-image-1'
            );

        } catch (error) {

          console.error(
            'Unable to restore Image 1:',
            error
          );

        }

      }


      // =================================================
      // RESTORE IMAGE 2
      // =================================================

      if (data.image2) {

        this.preview2 =
          data.image2;

        try {

          this.image2 =
            await this.base64ToFile(
              data.image2,
              'product-image-2'
            );

        } catch (error) {

          console.error(
            'Unable to restore Image 2:',
            error
          );

        }

      }


      // =================================================
      // DEBUG
      // =================================================

      console.log(
        'Product data restored from sessionStorage:',
        data
      );


      // =================================================
      // UPDATE ANGULAR
      // =================================================

      this.cd.detectChanges();


    } catch (error) {

      console.error(
        'Error loading product session:',
        error
      );

    }

  }


  // =====================================================
  // FIELD CHANGE
  // =====================================================

  async onProductChange(): Promise<void> {

    console.log(
      'Product field changed:',
      this.product
    );


    await this.saveSession();

  }


  // =====================================================
  // SAVE SESSION
  // =====================================================

  async saveSession(): Promise<void> {

    try {


      // =================================================
      // IMAGE 1
      // =================================================

      let image1Base64:
        string | null =
        this.preview1;


      // =================================================
      // IMAGE 2
      // =================================================

      let image2Base64:
        string | null =
        this.preview2;


      // =================================================
      // IF IMAGE 1 IS A FILE AND PREVIEW IS NOT BASE64
      // =================================================

      if (
        this.image1 &&
        (
          !this.preview1 ||
          !this.preview1.startsWith('data:')
        )
      ) {

        image1Base64 =
          await this.fileToBase64(
            this.image1
          );

        this.preview1 =
          image1Base64;

      }


      // =================================================
      // IF IMAGE 2 IS A FILE AND PREVIEW IS NOT BASE64
      // =================================================

      if (
        this.image2 &&
        (
          !this.preview2 ||
          !this.preview2.startsWith('data:')
        )
      ) {

        image2Base64 =
          await this.fileToBase64(
            this.image2
          );

        this.preview2 =
          image2Base64;

      }


      // =================================================
      // SAVE COMPLETE PRODUCT
      // =================================================

      const productData = {

        name:
          this.product.name,

        type:
          this.product.type,

        quantity:
          this.product.quantity,

        quality:
          this.product.quality,

        price:
          this.product.price,

        description:
          this.product.description,

        image1:
          image1Base64,

        image2:
          image2Base64

      };


      // =================================================
      // SAVE TO SESSION STORAGE
      // =================================================

      this.sessionStorage.setItem(

        this.PRODUCT_KEY,

        productData

      );


      // =================================================
      // DEBUG
      // =================================================

      console.log(
        'Product saved to sessionStorage:',
        productData
      );


    } catch (error) {

      console.error(
        'Error saving product session:',
        error
      );

    }

  }


  // =====================================================
  // FILE TO BASE64
  // =====================================================

  fileToBase64(
    file: File
  ): Promise<string> {

    return new Promise(
      (
        resolve,
        reject
      ) => {

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
        type:
          blob.type || 'image/jpeg'
      }

    );

  }


  // =====================================================
  // IMAGE SELECT
  // =====================================================

  onImageSelect(
    event: Event,
    type: number
  ): void {

    const input =
      event.target as HTMLInputElement;


    const file =
      input.files?.[0];


    if (!file) {

      return;

    }


    this.loadImage(
      file,
      type
    );

  }


  // =====================================================
  // LOAD IMAGE
  // =====================================================

  async loadImage(
    file: File,
    type: number
  ): Promise<void> {


    // =================================================
    // IMAGE TYPE VALIDATION
    // =================================================

    if (!file.type.startsWith('image/')) {

      alert(
        'Please select a valid image.'
      );

      return;

    }


    // =================================================
    // IMAGE SIZE VALIDATION
    // =================================================

    const maxSize =
      5 * 1024 * 1024;


    if (file.size > maxSize) {

      alert(
        'Image size should not exceed 5 MB.'
      );

      return;

    }


    // =================================================
    // CREATE PREVIEW
    // =================================================

    const preview =
      URL.createObjectURL(file);


    // =================================================
    // IMAGE 1
    // =================================================

    if (type === 1) {


      if (
        this.preview1 &&
        this.preview1.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.preview1
        );

      }


      this.image1 =
        file;


      this.preview1 =
        preview;

    }


    // =================================================
    // IMAGE 2
    // =================================================

    else if (type === 2) {


      if (
        this.preview2 &&
        this.preview2.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.preview2
        );

      }


      this.image2 =
        file;


      this.preview2 =
        preview;

    }


    // =================================================
    // SAVE SESSION
    // =================================================

    await this.saveSession();


    // =================================================
    // UPDATE VIEW
    // =================================================

    this.cd.detectChanges();

  }


  // =====================================================
  // ALLOW DROP
  // =====================================================

  allowDrop(
    event: DragEvent
  ): void {

    event.preventDefault();

    event.stopPropagation();

  }


  // =====================================================
  // DRAG ENTER
  // =====================================================

  dragEnter(
    event: DragEvent,
    type: number
  ): void {

    event.preventDefault();

    event.stopPropagation();


    if (type === 1) {

      this.dragging1 = true;

    }


    else if (type === 2) {

      this.dragging2 = true;

    }

  }


  // =====================================================
  // DRAG LEAVE
  // =====================================================

  dragLeave(
    event: DragEvent,
    type: number
  ): void {

    event.preventDefault();

    event.stopPropagation();


    if (type === 1) {

      this.dragging1 = false;

    }


    else if (type === 2) {

      this.dragging2 = false;

    }

  }


  // =====================================================
  // DROP IMAGE
  // =====================================================

  onDrop(
    event: DragEvent,
    type: number
  ): void {

    event.preventDefault();

    event.stopPropagation();


    // =================================================
    // RESET DRAG
    // =================================================

    if (type === 1) {

      this.dragging1 = false;

    }

    else if (type === 2) {

      this.dragging2 = false;

    }


    // =================================================
    // GET FILE
    // =================================================

    const file =
      event.dataTransfer?.files?.[0];


    if (!file) {

      return;

    }


    // =================================================
    // LOAD IMAGE
    // =================================================

    this.loadImage(
      file,
      type
    );

  }


  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  async removeImage(
    type: number
  ): Promise<void> {


    // =================================================
    // IMAGE 1
    // =================================================

    if (type === 1) {


      if (
        this.preview1 &&
        this.preview1.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.preview1
        );

      }


      this.image1 =
        null;


      this.preview1 =
        null;

    }


    // =================================================
    // IMAGE 2
    // =================================================

    else if (type === 2) {


      if (
        this.preview2 &&
        this.preview2.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.preview2
        );

      }


      this.image2 =
        null;


      this.preview2 =
        null;

    }


    // =================================================
    // SAVE UPDATED SESSION
    // =================================================

    await this.saveSession();


    // =================================================
    // UPDATE VIEW
    // =================================================

    this.cd.detectChanges();

  }


  // =====================================================
  // SAVE PRODUCT / UPLOAD
  // =====================================================

  async saveProduct(
    form: NgForm
  ): Promise<void> {

    this.submitted = true;


    // =================================================
    // MARK ALL FIELDS TOUCHED
    // =================================================

    form.control.markAllAsTouched();


    // =================================================
    // IMAGE VALIDATION
    // =================================================

    this.imageError =
      !(
        this.image1 &&
        this.image2
      );


    // =================================================
    // FORM VALIDATION
    // =================================================

    if (
      form.invalid ||
      this.imageError
    ) {

      alert(
        'Please fill all the fields and upload both images.'
      );

      return;

    }


    try {


      this.loading = true;


      // =================================================
      // SAVE LATEST DATA
      // =================================================

      await this.saveSession();


      // =================================================
      // CREATE PRODUCT DATA
      // =================================================

      const productData = {

        name:
          this.product.name,

        type:
          this.product.type,

        quantity:
          this.product.quantity,

        quality:
          this.product.quality,

        price:
          this.product.price,

        description:
          this.product.description,

        image1:
          this.preview1,

        image2:
          this.preview2

      };


      // =================================================
      // DEBUG
      // =================================================

      console.log(
        'Product ready for upload:',
        productData
      );


      // =================================================
      // API UPLOAD
      // =================================================

      const uploadSuccess =
        await this.uploadProduct(
          productData
        );


      // =================================================
      // SUCCESS
      // =================================================

      if (uploadSuccess) {


        // -----------------------------------------------
        // REMOVE SESSION ONLY AFTER SUCCESS
        // -----------------------------------------------

        this.sessionStorage.removeItem(
          this.PRODUCT_KEY
        );


        // -----------------------------------------------
        // CLEAR PRODUCT
        // -----------------------------------------------

        this.product = {

          name: '',

          type: '',

          quantity: '',

          quality: '',

          price: '',

          description: ''

        };


        // -----------------------------------------------
        // CLEAR IMAGE PREVIEWS
        // -----------------------------------------------

        this.clearImagePreview(1);

        this.clearImagePreview(2);


        this.image1 =
          null;

        this.image2 =
          null;


        this.preview1 =
          null;

        this.preview2 =
          null;


        // -----------------------------------------------
        // RESET FORM
        // -----------------------------------------------

        form.resetForm();


        this.submitted =
          false;

        this.imageError =
          false;


        this.loading =
          false;


        this.cd.detectChanges();


        alert(
          'Product uploaded successfully.'
        );


        return;

      }


      // =================================================
      // UPLOAD FAILED
      // =================================================

      this.loading =
        false;


      alert(
        'Product upload failed. Your product data has been kept.'
      );


    } catch (error) {


      console.error(
        'Product upload error:',
        error
      );


      this.loading =
        false;


      // =================================================
      // IMPORTANT:
      // DO NOT REMOVE SESSION
      // =================================================

      alert(
        'Product upload failed. Your data has been saved so you can retry.'
      );

    }

  }


  // =====================================================
  // UPLOAD PRODUCT
  // =====================================================

  async uploadProduct(
    productData: any
  ): Promise<boolean> {

    /*
     * Replace this with your actual API call.
     *
     * Example:
     *
     * const response =
     *   await this.productService.addProduct(
     *     productData
     *   );
     *
     * return response.success === true;
     */


    console.log(
      'Uploading product:',
      productData
    );


    // TEMPORARY
    return true;

  }


  // =====================================================
  // CLEAR IMAGE PREVIEW
  // =====================================================

  private clearImagePreview(
    type: number
  ): void {


    if (type === 1) {


      if (
        this.preview1 &&
        this.preview1.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.preview1
        );

      }

    }


    if (type === 2) {


      if (
        this.preview2 &&
        this.preview2.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.preview2
        );

      }

    }

  }

}