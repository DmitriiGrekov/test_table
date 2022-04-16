from django.urls import path
from .views import index, filter_view, add_rows_view


urlpatterns = [
        path('', index, name='index'),
        path('filter/', filter_view, name='filter'),
        path('rows/add/', add_rows_view, name='add_rows'),
        ]
