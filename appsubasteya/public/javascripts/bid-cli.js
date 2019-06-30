var js = window.js || {};

js.bid = (function () {
  var elems;
  var expose = {
    executeForm: () => {
      elems = _gatherFormElements();
      if (!_validateInputs()) {
        return;
      }
      _placeBid();
    }
  }

  function _gatherFormElements () {
    return {
      amount: document.getElementById('bid-amount'),
      address: document.getElementById('bid-address')
    }
  }  

  function _validateInputs() {
    if (elems.address.value && elems.amount.value) {
      return true;
    } else {
      alert('Incomplete Form');
      return false;
    }
  }

  function _cleanUpForm () {
    document.getElementById("bid-form").reset(); 
  }

  function _placeBid () {
    var bidData = _buildBid();  
    var opts = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: bidData
    };

    fetch('/auctions/bid', opts).then(function (res) {
      return res.json();
    })
    .then(function (jsonRes){
      if(jsonRes.success) {
        alert('Bid successfully placed');
      } else {
        console.log('err', jsonRes.error);
        alert(jsonRes.error);
      }
    })
    .catch(err => {
      console.log('err', err);
      alert('Unknown bid error');
    })
    .finally(_cleanUpForm());
  }

  function _buildBid () {
    let bid = {
      amount: elems.amount.value,
      address: elems.address.value
    }
    
    return JSON.stringify(bid);
  }

  return expose;
})();