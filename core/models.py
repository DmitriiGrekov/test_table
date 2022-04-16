from django.db import models



class TableRowsModel(models.Model):
    """
    Модель строки таблицы
    """
    date = models.DateField()
    name = models.CharField("Название",
                            max_length=100)
    count = models.IntegerField('Колличество',
                                default=0)
    distance = models.FloatField('Расстояние',
                                 default=0.0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Строка'
        verbose_name_plural = 'Строки'

