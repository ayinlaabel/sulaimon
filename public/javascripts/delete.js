$(document).ready(function(){
    $('.delete-appointment').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/patient/'+id,
            success: function(response) {
                alert('Appointment Deleted');
                window.location.href='/patient'
            },
            error: function(err) {
                console.log(err)
            }
        });
    });
});