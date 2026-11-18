import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FarmerNavbar } from './farmer-navbar/farmer-navbar';
import { FarmerHomepage } from './farmer-homepage/farmer-homepage';
import { Advertise } from './advertise/advertise';
import { Footer } from './footer/footer';
import { Aboutus } from './aboutus/aboutus';
import { CustomerNavbar } from './customer-navbar/customer-navbar';
import { CustomerHomepage } from './customer-homepage/customer-homepage';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AddProduct } from './add-product/add-product';
import { LoginPage } from './login-page/login-page';
import { ViewProduct } from './view-product/view-product';
import { ProductList } from './product-list/product-list';
import { AddWaste } from './add-waste/add-waste';
import { PurchaseProduct } from './purchase-product/purchase-product';
import { Register } from './register/register';
import { BuyFertilizers } from './buy-fertilizers/buy-fertilizers';
import { AddFertilizers } from './add-fertilizers/add-fertilizers';
import { AddSeeds } from './add-seeds/add-seeds';
import { History } from './history/history';
import { AdminLogin } from './admin-login/admin-login';
import { WildCardPage } from './wild-card-page/wild-card-page';
import { LandingPage } from './landing-page/landing-page';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { Layout } from './admin/layout/layout';
import { Dashboard } from './admin/dashboard/dashboard';
import { NewFarmers } from './admin/new-farmers/new-farmers';
import { NewProducts } from './admin/new-products/new-products';

@NgModule({
  declarations: [
    App,
    FarmerNavbar,
    FarmerHomepage,
    Advertise,
    Footer,
    Aboutus,
    CustomerNavbar,
    CustomerHomepage,
    AddProduct,
    LoginPage,
    ViewProduct,
    ProductList,
    AddWaste,
    PurchaseProduct,
    Register,
    BuyFertilizers,
    AddFertilizers,
    AddSeeds,
    History,
    AdminLogin,
    WildCardPage,
    LandingPage,
    AdminDashboard,
    Layout,
    Dashboard,
    NewFarmers,
    NewProducts,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgxSkeletonLoaderModule],
  providers: [provideBrowserGlobalErrorListeners()],

  bootstrap: [App],
})
export class AppModule {}
