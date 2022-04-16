document.addEventListener('DOMContentLoaded', function() {
    var table = document.getElementById('sortable');
    const headers = table.querySelectorAll('th');
    var tableBody = table.querySelector('tbody');
    var rows = tableBody.querySelectorAll('tr');

    // Направление сортировки
    const directions = Array.from(headers).map(function(header) {
        return '';
    });

    // Преобразовать содержимое данной ячейки в заданном столбце
    const transform = function(index, content) {
        // Получить тип данных столбца
        const type = headers[index].getAttribute('data-type');
        switch (type) {
            case 'count':
                return parseFloat(content);
            case 'distance':
                return parseFloat(content);
            case 'name':
            default:
                return content;
        }
    };

    const sortColumn = function(index) {

        var table = document.getElementById('sortable');
        var tableBody = table.querySelector('tbody');
        var rows = tableBody.querySelectorAll('tr');
        // Получить текущее направление
        const direction = directions[index] || 'asc';

        // Фактор по направлению
        const multiplier = (direction === 'asc') ? 1 : -1;

        const newRows = Array.from(rows);

        newRows.sort(function(rowA, rowB) {
            const cellA = rowA.querySelectorAll('td')[index].innerHTML;
            const cellB = rowB.querySelectorAll('td')[index].innerHTML;

            const a = transform(index, cellA);
            const b = transform(index, cellB);    

            switch (true) {
                case a > b: return 1 * multiplier;
                case a < b: return -1 * multiplier;
                case a === b: return 0;
            }
        });

        // Удалить старые строки
        [].forEach.call(rows, function(row) {
            tableBody.removeChild(row);
        });

        // Поменять направление
        directions[index] = direction === 'asc' ? 'desc' : 'asc';

        // Добавить новую строку
        newRows.forEach(function(newRow) {
            tableBody.appendChild(newRow);
        });
    };

    [].forEach.call(headers, function(header, index) {
        header.addEventListener('click', function() {
            sortColumn(index);
            var text = this.innerHTML.split(" ");
            if(text[1] == "▲"){
                text[1] = "&#9660;";
            }
            else{
                text[1] = "&#9650;";
            }
            this.innerHTML = text.join(' ')
        });
    });






});



$('#add_rows').click(function(e){
    e.preventDefault()

    date = document.getElementById('date_input').value
    name = document.getElementById('name_input').value
    count = document.getElementById('count_input').value
    distance = document.getElementById('distance_input').value
    csrf = document.querySelector('.modal-body > form:nth-child(1) > input:nth-child(5)').value

    datas = {
        'date': date,
        'name': name,
        'count': count,
        'distance': distance,
        'csrfmiddlewaretoken': csrf
    }

    console.log(datas)

    $.ajax({
        type: "POST",
        url: 'rows/add/',
        data: datas,
        dataType: 'text',
        success: function (data) {
            mes = document.getElementById('success_message')
            mes.style.display = 'block'

            }
        });




})





