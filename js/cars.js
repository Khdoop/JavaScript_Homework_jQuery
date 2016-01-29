/**
 * Created by Admin on 27/01/2016.
 */
$(function () {
    var cars = [],
        flag = false,
        index;

    $('form').on('submit', function(e) {
        e.preventDefault();

        var errorsBrand = [],
            errorsModel = [],
            errorsYear = [],
            errorsDistance = [],
            brand = $(this).find('#brand'),
            model = $(this).find('#model'),
            year = $(this).find('#year'),
            distance = $(this).find('#distance');

        //### validate brand ###
        if (!validateRequired(brand)) {
            errorsBrand.push('This field is required.');
        } else if (!validateLength(brand, 2)) {
            errorsBrand.push('Min Brand name length is 2.');
        } else if (!validateAlphaNum(brand)) {
            errorsBrand.push('Letters and digits only.');
        }
        //### validate model ###
        if (!validateRequired(model)) {
            errorsModel.push('This field is required.');
        } else if (!validateLength(model, 2)) {
            errorsModel.push('Min Model name length is 2.');
        } else if (!validateAlphaNum(model)) {
            errorsModel.push('Letters and digits only.');
        }
        //### validate year ###
        if (!validateRequired(year)) {
            errorsYear.push('This field is required.');
        } else if (!validateNumber(year)) {
            errorsYear.push('Only numbers are allowed.')
        }
        //### validate distance ###
        if (!validateRequired(distance)) {
            errorsDistance.push('This field is required.');
        } else if (!validateNumber(distance)) {
            errorsDistance.push('Only numbers are allowed.')
        }
        //### remove existing errors ###
        brand.parent().find('span').remove();
        model.parent().find('span').remove();
        year.parent().find('span').remove();
        distance.parent().find('span').remove();
        //### put errors ###
        if (errorsBrand.length) {
            brand.parent().append('<span>' + errorsBrand + '</span>');
        }
        if (errorsModel.length) {
            model.parent().append('<span>' + errorsModel + '</span>');
        }
        if (errorsYear.length) {
            year.parent().append('<span>' + errorsYear + '</span>');
        }
        if (errorsDistance.length) {
            distance.parent().append('<span>' + errorsDistance + '</span>');
        }
        //### return if errors ###
        if (errorsBrand.length || errorsModel.length || errorsYear.length || errorsDistance.length) {
            return;
        }
        //### edit in table ###
        if (flag) {
            cars[index] = {
                'brand': brand.val(),
                'model': model.val(),
                'year': year.val(),
                'distance': distance.val()
            };

            var editRow = $('table').find('tr').eq(index + 1);
            editRow.find('td').eq(1).text(brand.val());
            editRow.find('td').eq(2).text(model.val());
            editRow.find('td').eq(3).text(year.val());
            editRow.find('td').eq(4).text(distance.val());

            this.reset();
            flag = false;
            $(this).slideUp();
            $('table').slideDown();
            console.log(cars);
            return;
        }
        //### add in table ###
        cars.push({
            'brand': brand.val(),
            'model': model.val(),
            'year': year.val(),
            'distance': distance.val()
        });
        var tableNumber = '<td>'+ $('tr').length +'</td>',
            tableBrand = '<td>'+ brand.val() +'</td>',
            tableModel = '<td>'+ model.val() +'</td>',
            tableYear = '<td>'+ year.val() +'</td>',
            tableDistance = '<td>'+ distance.val() +'</td>',
            tableActions = '<td><button><i class="fa fa-pencil"></i></button><button><i class="fa fa-trash"></i></button></td>',
            row = '<tr>'+ tableNumber + tableBrand + tableModel + tableYear + tableDistance + tableActions +'</tr>';

        $('tbody').append(row);

        this.reset();
        $(this).slideUp();
        $('.table').slideDown();
        console.log(cars);
    });
    //### edit/delete ###
    $('table')
        .on('click', 'button:has(i.fa.fa-trash)', function() {
            if (confirm('Are you sure you want to remove the car?')) {
                index = parseInt($(this).parent().parent().find('td:first-child').text()) - 1;
                $(this).parent().parent().remove();
                cars.splice(index);
                flag = false;
                $('form')[0].reset();
                console.log(cars);
            }
        })
        .on('click', 'button:has(i.fa.fa-pencil)', function() {
            index = parseInt($(this).parent().parent().find('td:first-child').text()) - 1;
            console.log(index);
            $('form #brand').val(cars[index].brand);
            $('form #model').val(cars[index].model);
            $('form #year').val(cars[index].year);
            $('form #distance').val(cars[index].distance);
            flag = true;
            $('form').slideDown();
            console.log(cars);
        });
    //### toggle containers ###
    $('.addCars > h3').on('click', function() {
        $(this).parent().find('form').slideToggle();
    });

    $('.listCars > h3').on('click', function() {
        $(this).parent().find('.table').slideToggle();
    });

});