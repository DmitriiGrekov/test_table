from django.contrib import admin
from .models import TableRowsModel


@admin.register(TableRowsModel)
class TableRowsAdmin(admin.ModelAdmin):
    list_display = ('date',
                    'name',
                    'count',
                    'distance')


