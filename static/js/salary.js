$(document).ready(function(){
    $(document).ajaxStart(function(){
        $("#wait").css("display", "block");
      });
      $(document).ajaxComplete(function(){
        $("#wait").css("display", "none");
      });

    var table = $('#dataTable').DataTable(
        {
            columns: [
                { data: 'agencyName' },
                { data: 'lastName' },
                { data: 'firstName' },
                { data: 'jobTitle' },
                { data: 'compRate' },
                { data: 'compRatePeriod' },
                { data: 'fullPart' }
            ],
            pageLength: 10,
            responsive: true,
            fixedHeader: true,
            language: {
                search: "Filter records:",
                emptyTable: "No results"
            },
            scrollX: true,
            scrollCollapse: true,
            order:[],
            colReorder: true
            //"dom": '<"toolbar">frtip'
            //scrollY: 400,
            
            //select: true,
            //destroy: true
        }
    );

    $("div.toolbar").html('<button id="clear"  type="button" class="btn btn-info">Clear</button>');

    $("#clear").on('click', function(){
        $('#main-form').trigger("reset");
        table.clear().draw();
        table.search('').draw();
        // Not working
        // https://datatables.net/reference/api/colReorder.reset()
        // table.colReorder.reset();  

        //$('#main-form').trigger("reset");
        //var table = $('#dataTable').DataTable();
        //table.clear().draw();
        //table.search('').draw();
    })

    $("#submit").on('click', function(){
        var form = $("#main-form");
        var jsonData = convertFormToJson(form);

        $.ajax({
            url: "/salary/search.json",
            type: 'POST',
            dataType : 'json', // data type
            data : jsonData, // post data || get data
            contentType: 'application/json;charset=UTF-8',
            success: function (json) {
                //Get Datatable API
                //var table = $('#dataTable').DataTable();
                
                //Row data array is in 'data' object
                //Add the data array 'data.data' and redraw the table
                if(json.data.length == 0) {
                    table.clear().draw();
                }else{
                    table.clear();
                    table.rows.add(json.data).draw();
                }
            },
            error: function(xhr, status, error) {
                //var errMsg = JSON.parse(xhr.responseText) ;
                console.log('error: '+xhr.responseText)
                //var table = $('#dataTable').DataTable();
                table.clear().draw();
            }
        });

    });

    $.ajax({
            url: '/salary/api/distinctAgencyNames.json',                        
            type: 'GET',                                  
            success: function(json){    // response contains json object in it
                var options = '<option value="">Select Agency Name</option>';
                $.each(json.data, function (i, item) {
                    options += '<option value="'+json.data[i]+'">' +json.data[i]+ "</option>";  
                });

                $("#agencyName").html(options);    // It will put the dynamic <option> set into the dropdown
            }
    });



    $.ajax({
            url: '/salary/api/distinctJobTitles.json',                        
            type: 'GET',                                  
            success: function(json){    // response contains json object in it
                var jobTitleValues = [];
                var i=0;
                $.each(json.data, function (i, item) {
                    jobTitleValues.push(json.data[i])
                });
                initJobTitleTypeahead(jobTitleValues);
            }
    });
    function initJobTitleTypeahead(jobTitleValues) {
        $.typeahead({
                        input: '.js-typeahead-jobTitle',
                        order: "desc",
                        source: {
                            data: jobTitleValues
                        },
                        callback: {
                            onInit: function (node) {
                                console.log('Typeahead Initiated on ' + node.selector);
                            }
                        }
                    });
    }


})