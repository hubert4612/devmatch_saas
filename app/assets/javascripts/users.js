$(document).ready(function() {
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    
    $("#form-submit-btn").click(function(event) {
        event.preventDefault();
        $('input[type=submit]').prop('disabled', true);
        var error = false;
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
    
    if (!error) {
        //stripe token
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler);
    }
    return false;
    }); //form sub
    
    function stripeResponseHandler(status, response) {
        //get ref to the form:
        var f = $("#new_user");
        
        // get token 
        var token = response.id;
        
        // add token
        f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
        
        //submit the form
        
        f.get(0).submit();
      }
    });