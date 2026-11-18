import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FarmerNavbar } from './farmer-navbar/farmer-navbar';
import { FarmerHomepage } from './farmer-homepage/farmer-homepage';
import { Advertise } from './advertise/advertise';
import { Footer } from './footer/footer';
import { Aboutus } from './aboutus/aboutus';
import { CustomerHomepage } from './customer-homepage/customer-homepage';
import { AddProduct } from './add-product/add-product';
import { CustomerNavbar } from './customer-navbar/customer-navbar';
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
import { Layout } from './admin/layout/layout';
import { Dashboard } from './admin/dashboard/dashboard';
import { NewFarmers } from './admin/new-farmers/new-farmers';
import { NewProducts } from './admin/new-products/new-products';
const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'register',
    component: Register
  },

  {
    path: 'farmer',
    component: FarmerNavbar,
    children: [
      {
        path: 'homepage',
        component: FarmerHomepage
      },
      {
        path: '',
        component: FarmerHomepage
      },
      {
        path: 'aboutus',
        component: Aboutus
      },
      {
        path: 'addproduct',
        component: AddProduct
      },
      {
        path: 'viewproduct',
        component: ViewProduct
      },
      {
        path: 'add-waste',
        component: AddWaste
      },
      {
        path: 'purchase-product',
        component: ProductList
      },
      {
        path: 'buyfertilizer',
        component: BuyFertilizers
      },
      {
        path: 'add-seeds',
        component: AddSeeds
      },
      {
        path: 'history',
        component: History
      },
      {
        path: '**',
        component: WildCardPage
      }

    ]
  },
  {
    path: "customer",
    component: CustomerNavbar,
    children: [
      {
        path: '',
        component: CustomerHomepage

      },
      {
        path: "homepage",
        component: CustomerHomepage
      },
      {
        path: 'aboutus',
        component: Aboutus
      },
      {
        path: 'products',
        component: ProductList
      },
      {
        path: 'history',
        component: History
      },
      {
        path: '**',
        component: WildCardPage
      }

    ]
  },


  //--------------------------------- Admin -----------------------------------//
  // {

  //   path: 'admin',
  //   component: AdminLogin,
  //   children: [
  //     {
  //       path:'layout',
  //       component:Layout
  //     }

  //   ]
  // },

  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },

  
{
  path:'admin-login',
  component:AdminLogin
},
  {
    path: 'admin',
    component: Layout,

    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path:'New-farmers',
        component:NewFarmers
      },
      {
        path:'new',
        component:NewProducts
      }

    ]
  },
  {
    path: 'add-fertilizers',
    component: AddFertilizers
  },
  {
    path: 'add-seeds',
    component: AddSeeds
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableViewTransitions: true,
      scrollPositionRestoration: 'top'
    }),
    RouterOutlet
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
