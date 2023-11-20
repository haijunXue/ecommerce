from django.urls import  path
from .import views

from store.controller import authview,cart,wishlist,checkout,order

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #主界面
    path('', views.home, name="home"),
    path('collections', views.collections, name="collections"),
    path('collections/<str:slug>', views.collectionsview, name="collectionsview"),
    path('collections/<str:cate_slug>/<str:prod_slug>', views.productive, name="productview"),

    path('product-list', views.productlistAjax),
    path('searchproduct', views.searchproduct, name="searchproduct"),

    #登录
    path('register/', authview.register, name="register"),
    path('login/', authview.loginpage, name="loginpage"),
    path('logout/', authview.logoutpage, name="logout"),
    path('reset_password/', authview.reset_password, name='reset_password'),

    #购物车
    path('add-to-cart', cart.addtocart, name="addtocart"),
    path('cart', cart.viewcart, name="cart"),
    path('update-cart', cart.updatecart, name="updatecart"),
    path('delete-cart-item', cart.deletecartitem, name="deletecartitem"),

    #愿望清单
    path('wishlist', wishlist.index, name="wishlist"),
    path('add-to-wishlist', wishlist.addtowishlist, name="addtowishlist"),
    path('delete-wishlist-item', wishlist.deletewishlistitem, name="deletewishlistitem"),

    #checkout
    path('checkout', checkout.index, name="checkout"),
    path('place-order', checkout.placeorder, name="placeorder"),
    path('proceed-to-pay', checkout.razorpaycheck),

    path('my-orders', order.index, name="myorders"),
    path('view-order/<str:t_no>', order.vieworder, name="orderview"),

    #rest password

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)