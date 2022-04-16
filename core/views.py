from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import  TableRowsModel
from django.db.models import Q
from datetime import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def index(request):
    rows = TableRowsModel.objects.all().order_by('-date')
    paginator = Paginator(rows, 5)
    page = request.GET.get('page')
    try:
        rows = paginator.page(page)
    except PageNotAnInteger:
        rows = paginator.page(1) 
    except EmptyPage:
        rows = paginator.page(paginator.num_pages)

    page_obj = paginator.get_page(page)
    return render(request, 'core/table.html', {'rows': rows, 'page_obj': page_obj})


def filter_data(column, condition, meaning):
    if condition == 'equal':
        data = {column: meaning}
    elif condition == 'more':
        column += "__gt"
        data = {column: meaning}
    elif condition == 'less':
        column += "__lt"
        data = {column: meaning}
    return data

    
def filter_view(request):
    if request.method == 'GET':
        column = request.GET.get('column')
        condition = request.GET.get('condition')
        meaning = request.GET.get('meaning')

        if column == 'date':
            meaning = datetime.strptime(meaning, "%d.%m.%Y")

        if column == 'name':
            rows = TableRowsModel.objects.filter(name__icontains=meaning)
        else:
            data = filter_data(column, condition, meaning)
            rows = TableRowsModel.objects.filter(**data)

        paginator = Paginator(rows, 5)
        page = request.GET.get('page')
        try:
            rows = paginator.page(page)
        except PageNotAnInteger:
            rows = paginator.page(1)
        except EmptyPage:
            rows = paginator.page(paginator.num_pages)

        page_obj = paginator.get_page(page)

        return render(request, 'core/table.html', {'rows': rows, 'page_obj': page_obj})


def add_rows_view(request):
    if request.method == "POST":
        date = request.POST.get('date')
        name = request.POST.get('name')
        count = int(request.POST.get('count'))
        distance = int(request.POST.get('distance'))

        date = datetime.strptime(date, "%d.%m.%Y")

        rows = TableRowsModel(date=date,
                              name=name,
                              count=count,
                              distance=distance)
        rows.save()
        return JsonResponse({'status': 'created'}) 


        
