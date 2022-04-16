document.addEventListener('DOMContentLoaded', function()
    {
    $('#filter').bind('click', function(e){
        e.preventDefault();

        let column = document.getElementById('column').value;
        let condition = document.getElementById('condition').value;
        let meaning = document.getElementById('meaning').value;
        let csrf = document.querySelector('.col-lg-3 > form:nth-child(1) > input:nth-child(1)').value;

        if(column == 'none' || condition == 'none' || meaning == '') {
            let message = document.getElementById('message')
            message.innerHTML = "Выберите все параметры"
            message.style.display = 'block'
            return;

        }

        if(column == 'name' && condition != 'contains'){
            let message = document.getElementById('message')
            message.innerHTML = "Поле Название можно сортировать только по содержимому"
            message.style.display = 'block'
            return;
        }

        if(column == 'date' && condition == 'contains'){
            let message = document.getElementById('message')
            message.innerHTML = "Дату можно только сравнивать =, >, <"
            message.style.display = 'block'
            return;
        }

            

        const url = `filter/?column=${column}&condition=${condition}&meaning=${meaning}`;
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'text',
            success: function (data) {
                $('#sortable > tbody').empty();
                $('#sortable > tbody').append($(data).find('#sortable > tbody').html());

                $('.pagination').empty();

                $('.pagination').append($(data).find(".pagination").html());


                    message.style.display = 'none'




                    },
            error: function(er){
                if(er.status != 200){
                    let message = document.getElementById('message')
                    message.innerHTML = "Вы ввели не правильное значение"
                    message.style.display = 'block'
                    return;

                }
            }
        });

       })


        

    

   //Установка формата даты 


        $('#column').bind("change", function(){
          let val = this.options[this.selectedIndex].value;
            if(val == 'date'){
                document.getElementById('meaning').placeholder = 'd.m.Y (21.01.2000)';
            }
            else
            {

                document.getElementById('meaning').placeholder = 'Введите значение';
            }
        });    

//Проверка condition
        



        $('#condition').bind("change", function(){

            let column = document.getElementById('column').value;
            let condition = document.getElementById('condition').value;

            if (column == 'name' && condition != 'contains'){
                let message = document.getElementById('message')
                message.innerHTML = 'Название можно проверять только на содержимое!'
                message.style.display = 'block';
                    
            }
            else{

                message.style.display = 'none';

            }
 


        }) }) 


function ajaxPagination(){
        let pages = document.getElementsByClassName('page-link')
        
        for(var i = 0; i < pages.length; i++)
        {
            pages[i].addEventListener('click', function(e){
                e.preventDefault()
                var href = this.href
                let column = document.getElementById('column').value;
                let condition = document.getElementById('condition').value;
                let meaning = document.getElementById('meaning').value;

                if(meaning != "" && column != 'none' && condition != "none"){
                    href = href.split('=')[1]

                    const url = `filter/?column=${column}&condition=${condition}&meaning=${meaning}&page=${href}`;
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: 'text',
                        success: function (data) {
                            $('#sortable > tbody').empty();
                            $('#sortable > tbody').append($(data).find('#sortable > tbody').html());

                            $('.pagination').empty();
                            $('.pagination').append($(data).find(".pagination").html());


                    }
        });

                }

                else{
                    href = href.split('=')[1]

                    const url = `?page=${href}`;
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: 'text',
                        success: function (data) {
                            $('#sortable > tbody').empty();
                            $('#sortable > tbody').append($(data).find('#sortable > tbody').html());

                            $('.pagination').empty();
                            $('.pagination').append($(data).find(".pagination").html());


                    }
        });


                }

            })
        }

}






$(document).ready(function(){
    ajaxPagination()
})

$(document).ajaxStop(function(){
    ajaxPagination()
})


