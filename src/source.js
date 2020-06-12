import $ from 'jquery';
import './styles.scss';
let innitialData = require('./sample.json');
const tableNode = $('.customer-table');

const customerRow = ({ Name = '', Surname = '', Email = '', Phone = '', Age = '', City = '' }) => (`
    <div class="row">
        <div class="col">${Name}</div>
        <div class="col">${Surname}</div>
        <div class="col">${Email}</div>
        <div class="col">${Phone}</div>
        <div class="col">${Age}</div> 
        <div class="col">${City}</div> 
    </div>
`);

const populateTable = (data) => {
    $('.row').remove();
    for (let customer of data) {
        $(tableNode).append(customerRow(customer));
    };
};


//sorting rules, ascending only
const compareNames = (a, b) => {
    return a.Name.toUpperCase() < b.Name.toUpperCase() ? -1 : 1
};
const compareCities = (a, b) => {
    return a.City.toUpperCase() < b.City.toUpperCase() ? -1 : 1
};

$(document).ready(() => {
    populateTable(innitialData);
    //open modal
    $('#add-new-customer').click(() => {
        $('.modal').fadeIn(300)
    });
    //close modal
    $('.modal-overlay, #cancel, .close-modal span').click(() => {
        $('.modal').fadeOut(300)
    });

    // submit form 
    $('#add-customer-form').submit((e) => {
        e.preventDefault();
        const formData = $('#add-customer-form').serializeArray();
        const formObject = formData.reduce((obj, item) => {
            obj[item.name] = item.value;
            return obj;
        }, {});

        //handle errors
        $('#Name, #Email').removeClass('input-error');
        $('.confirmation').removeClass('success');

        const nameError = formObject.Name || $('#Name').addClass('input-error');
        const emailError = formObject.Email || $('#Email').addClass('input-error');

        if (emailError.length > 1 && nameError.length > 1) {
            innitialData = [...innitialData, formObject];
            populateTable(innitialData);
            $('#add-customer-form')[0].reset();
            $('.confirmation').addClass('success');

        };
        return false;
    });

    //sort on click
    $(".sort-name").click(() => {
        innitialData.sort(compareNames);
        populateTable(innitialData);
    })
    
    $(".sort-city").click(() => {
        innitialData.sort(compareCities);
        populateTable(innitialData);
    })


});

