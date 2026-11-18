
import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionStorage } from '../session-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {

  // =====================================================
  // SERVICES
  // =====================================================

  private sessionStorage = inject(SessionStorage);

  constructor(private router: Router) {}

  readonly REGISTRATION_KEY = 'registrationData';


  // =====================================================
  // FORM STATE
  // =====================================================

  submitted = false;
  loading = false;

  showPassword = false;
  showConfirm = false;


  // =====================================================
  // USER
  // =====================================================

  user = {

    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    role: '',
    state: '',
    city: '',
    address: ''

  };


  // =====================================================
  // STATES
  // =====================================================

  states: string[] = [

    'Maharashtra',
    'Karnataka',
    'Gujarat',
    'Madhya Pradesh',
    'Goa',
    'Telangana',
    'Andhra Pradesh'

  ];


  // =====================================================
  // CITIES
  // =====================================================

  cities: string[] = [

    'Solapur',
    'Pune',
    'Mumbai',
    'Nashik',
    'Nagpur',
    'Kolhapur',
    'Sangli',
    'Satara'

  ];


  // =====================================================
  // DRAG STATE
  // =====================================================

  dragging1 = false;
  dragging2 = false;
  dragging3 = false;


  // =====================================================
  // IMAGE FILES
  // =====================================================

  aadhaarFrontImage: File | null = null;
  aadhaarBackImage: File | null = null;


  // =====================================================
  // IMAGE PREVIEWS
  // =====================================================

  aadhaarFrontPreview: string | null = null;
  aadhaarBackPreview: string | null = null;


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadSession();

  }


  // =====================================================
  // LOAD SESSION STORAGE
  // =====================================================

  loadSession(): void {

    const data =
      this.sessionStorage.getItem<any>(
        this.REGISTRATION_KEY
      );


    if (!data) {

      return;

    }


    // =================================================
    // RESTORE USER DATA
    // =================================================

    this.user = {

      username: data.username || '',

      email: data.email || '',

      password: data.password || '',

      confirmPassword:
        data.confirmPassword || '',

      mobile: data.mobile || '',

      role: data.role || '',

      state: data.state || '',

      city: data.city || '',

      address: data.address || ''

    };


    // =================================================
    // RESTORE IMAGES
    // =================================================

    this.aadhaarFrontPreview =
      data.aadhaarFront || null;

    this.aadhaarBackPreview =
      data.aadhaarBack || null;


    console.log(
      'Registration data restored:',
      data
    );

  }


  // =====================================================
  // SAVE FORM DATA
  // =====================================================
  //
  // This method is called by:
  //
  // (ngModelChange)="saveFormData()"
  //
  // It saves normal fields immediately.
  //
  // =====================================================

  saveFormData(): void {

    const data = {

      ...this.user,

      aadhaarFront:
        this.aadhaarFrontPreview,

      aadhaarBack:
        this.aadhaarBackPreview

    };


    this.sessionStorage.setItem(
      this.REGISTRATION_KEY,
      data
    );


    console.log(
      'Form data saved'
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
  // SAVE IMAGE + FORM DATA
  // =====================================================

  async saveSession(): Promise<void> {

    let frontImage =
      this.aadhaarFrontPreview;

    let backImage =
      this.aadhaarBackPreview;


    // =================================================
    // FRONT IMAGE
    // =================================================

    if (this.aadhaarFrontImage) {

      frontImage =
        await this.fileToBase64(
          this.aadhaarFrontImage
        );

      this.aadhaarFrontPreview =
        frontImage;

    }


    // =================================================
    // BACK IMAGE
    // =================================================

    if (this.aadhaarBackImage) {

      backImage =
        await this.fileToBase64(
          this.aadhaarBackImage
        );

      this.aadhaarBackPreview =
        backImage;

    }


    // =================================================
    // SAVE EVERYTHING
    // =================================================

    this.sessionStorage.setItem(
      this.REGISTRATION_KEY,
      {

        ...this.user,

        aadhaarFront:
          frontImage || null,

        aadhaarBack:
          backImage || null

      }
    );


    console.log(
      'Form + images saved to sessionStorage'
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
        'Please select a valid image file.'
      );

      return;

    }


    // =================================================
    // FILE SIZE VALIDATION
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
    // CREATE IMMEDIATE PREVIEW
    // =================================================

    const preview =
      URL.createObjectURL(file);


    // =================================================
    // AADHAAR FRONT
    // =================================================

    if (type === 2) {

      // Revoke previous blob URL

      if (
        this.aadhaarFrontPreview &&
        this.aadhaarFrontPreview.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.aadhaarFrontPreview
        );

      }


      this.aadhaarFrontImage =
        file;

      this.aadhaarFrontPreview =
        preview;

    }


    // =================================================
    // AADHAAR BACK
    // =================================================

    if (type === 3) {

      // Revoke previous blob URL

      if (
        this.aadhaarBackPreview &&
        this.aadhaarBackPreview.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.aadhaarBackPreview
        );

      }


      this.aadhaarBackImage =
        file;

      this.aadhaarBackPreview =
        preview;

    }


    // =================================================
    // SAVE IMAGE
    // =================================================

    await this.saveSession();

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

    else if (type === 3) {

      this.dragging3 = true;

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

    else if (type === 3) {

      this.dragging3 = false;

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


    if (type === 1) {

      this.dragging1 = false;

    }

    else if (type === 2) {

      this.dragging2 = false;

    }

    else if (type === 3) {

      this.dragging3 = false;

    }


    const file =
      event.dataTransfer?.files?.[0];


    if (!file) {

      return;

    }


    this.loadImage(
      file,
      type
    );

  }


  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  removeImage(
    type: number
  ): void {

    // =================================================
    // FRONT
    // =================================================

    if (type === 2) {

      if (
        this.aadhaarFrontPreview &&
        this.aadhaarFrontPreview.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.aadhaarFrontPreview
        );

      }


      this.aadhaarFrontImage =
        null;

      this.aadhaarFrontPreview =
        null;

    }


    // =================================================
    // BACK
    // =================================================

    if (type === 3) {

      if (
        this.aadhaarBackPreview &&
        this.aadhaarBackPreview.startsWith('blob:')
      ) {

        URL.revokeObjectURL(
          this.aadhaarBackPreview
        );

      }


      this.aadhaarBackImage =
        null;

      this.aadhaarBackPreview =
        null;

    }


    // Save updated data

    this.saveFormData();

  }


  // =====================================================
  // REGISTER
  // =====================================================

  async register(
    form: NgForm
  ): Promise<void> {

    this.submitted = true;


    // =================================================
    // MARK ALL FIELDS TOUCHED
    // =================================================

    form.control.markAllAsTouched();


    // =================================================
    // FORM VALIDATION
    // =================================================

    if (form.invalid) {

      alert(
        'Please fill all required fields correctly.'
      );

      return;

    }


    // =================================================
    // PASSWORD VALIDATION
    // =================================================

    if (
      this.user.password !==
      this.user.confirmPassword
    ) {

      alert(
        'Password and Confirm Password do not match.'
      );

      return;

    }


    // =================================================
    // IMAGE VALIDATION
    // =================================================

    if (
      !this.aadhaarFrontPreview ||
      !this.aadhaarBackPreview
    ) {

      alert(
        'Please upload Aadhaar Front and Aadhaar Back images.'
      );

      return;

    }


    // =================================================
    // SAVE EVERYTHING
    // =================================================

    await this.saveSession();


    // =================================================
    // FORM DATA
    // =================================================

    const formData =
      new FormData();


    formData.append(
      'username',
      this.user.username
    );

    formData.append(
      'email',
      this.user.email
    );

    formData.append(
      'password',
      this.user.password
    );

    formData.append(
      'phone',
      this.user.mobile
    );

    formData.append(
      'role',
      this.user.role
    );

    formData.append(
      'state',
      this.user.state
    );

    formData.append(
      'city',
      this.user.city
    );

    formData.append(
      'address',
      this.user.address
    );


    // =================================================
    // ADD FILES
    // =================================================

    if (this.aadhaarFrontImage) {

      formData.append(
        'aadhaarFront',
        this.aadhaarFrontImage
      );

    }


    if (this.aadhaarBackImage) {

      formData.append(
        'aadhaarBack',
        this.aadhaarBackImage
      );

    }


    // =================================================
    // DEBUG
    // =================================================

    console.log(
      '========== REGISTRATION =========='
    );


    formData.forEach(
      (value, key) => {

        console.log(
          key,
          value
        );

      }
    );


    // =================================================
    // SUCCESS
    // =================================================

    alert(
      'Registration Successful'
    );


    // =================================================
    // REMOVE REGISTRATION SESSION
    // =================================================

    this.sessionStorage.removeItem(
      this.REGISTRATION_KEY
    );


    // =================================================
    // SAVE ROLE BEFORE RESET
    // =================================================

    const role =
      this.user.role;


    // =================================================
    // RESET
    // =================================================

    this.reset(form);


    // =================================================
    // NAVIGATION
    // =================================================

    if (role === 'Farmer') {

      await this.router.navigate(
        ['/farmer/homepage']
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }
   if (role === 'Admin') {

      await this.router.navigate(
        ['/admin/dashboard']
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

    if (role === 'Customer') {

      await this.router.navigate(
        ['/customer/homepage']
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

  }


  // =====================================================
  // RESET
  // =====================================================

  reset(
    form: NgForm
  ): void {

    this.user = {

      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      role: '',
      state: '',
      city: '',
      address: ''

    };


    this.aadhaarFrontImage =
      null;

    this.aadhaarBackImage =
      null;

    this.aadhaarFrontPreview =
      null;

    this.aadhaarBackPreview =
      null;


    this.submitted =
      false;

    this.loading =
      false;


    this.showPassword =
      false;

    this.showConfirm =
      false;


    this.dragging1 =
      false;

    this.dragging2 =
      false;

    this.dragging3 =
      false;


    form.resetForm();

  }


  // =====================================================
  // TOGGLE PASSWORD
  // =====================================================

  togglePassword(
    input: HTMLInputElement
  ): void {

    this.showPassword =
      !this.showPassword;


    setTimeout(() => {

      input.focus();

      const length =
        input.value.length;

      input.setSelectionRange(
        length,
        length
      );

    });

  }


  // =====================================================
  // TOGGLE CONFIRM PASSWORD
  // =====================================================

  toggleConfirmPassword(
    input: HTMLInputElement
  ): void {

    this.showConfirm =
      !this.showConfirm;


    setTimeout(() => {

      input.focus();

      const length =
        input.value.length;

      input.setSelectionRange(
        length,
        length
      );

    });

  }

}