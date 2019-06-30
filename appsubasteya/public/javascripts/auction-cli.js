var js = window.js || {};

js.auction = (function () {
  var elems;
  var expose = {
    adjustTextarea: (txtArea) => {
      txtArea.style.height = "20px";
      txtArea.style.height = (txtArea.scrollHeight) + "px";
    },
    executeForm: () => {
      elems = _gatherFormElements();
      if (!_validateInputs()) {
        return;
      }
      
      if (elems.formBtn.dataset.action === 'start') {
        _deployContract();
      }
      if (elems.formBtn.dataset.action === 'end') {
        _cancelContract();
      }
    }
  }

  function _gatherFormElements () {
    return {
      url: document.getElementById('auction-url'),
      name: document.getElementById('auction-name'),
      description: document.getElementById('auction-desc'),
      basePrice: document.getElementById('auction-base-price'),
      minPrice: document.getElementById('auction-min-price'),
      maxPrice: document.getElementById('auction-max-price'),
      maxOffers: document.getElementById('auction-max-offers'),
      publicInfo: document.querySelector('input[name="public-info"]:checked'),
      ownerAddress: document.getElementById('auction-owner-address'),
      formBtn: document.getElementById('auction-button')
    }
  }  

  function _validateInputs() {
    if (elems.url.value && elems.name.value && elems.description.value &&
    elems.basePrice.value && elems.minPrice.value && elems.maxPrice.value &&
    elems.maxOffers.value) {
      return true;
    } else {
      alert('Incomplete Form')
      return false;
    }
  }

  function _deployContract () {
    var auctionData = _buildAuction();  
    var opts = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: auctionData
    };

    fetch('/auctions/start', opts).then(function (res) {
      return res.json();
    })
    .then(function (jsonRes){
      if(jsonRes.success) {
        _disableAndHideFields();
      } else {
        console.log('err', jsonRes.error);
        alert(jsonRes.error);
        _cleanUpForm();
      }
    })
    .catch(err => {
      console.log('err', err);
      alert('Unknown deploy error');
      _cleanUpForm();
    });
  }

  function _buildAuction () {
    let auction = {
      url: elems.url.value,
      name: elems.name.value,
      description: elems.description.value,
      basePrice: elems.basePrice.value,
      minPrice: elems.minPrice.value,
      maxPrice: elems.maxPrice.value,
      maxOffers: elems.maxOffers.value,
      publicInfo: elems.publicInfo.value
    }
    if (elems.ownerAddress.value) {
      auction.ownerAddress = elems.ownerAddress.value 
    }    
    
    return JSON.stringify(auction);
  }

  function _disableAndHideFields () {
    if (elems.publicInfo.value === 'hide') {
      elems.minPrice.value = "private";
      elems.maxPrice.value = "private";
      elems.maxOffers.value = "private";
    }
    elems.url.disabled = true;
    elems.name.disabled = true;
    elems.description.disabled = true;
    elems.basePrice.disabled = true;
    elems.minPrice.disabled = true;
    elems.maxPrice.disabled = true;
    elems.maxOffers.disabled = true;
    
    document.querySelectorAll('input[name="public-info"]').forEach(function (el, idx, list) {
      el.disabled = true;
    });

    elems.formBtn.value = 'End Auction';
    elems.formBtn.dataset.action = 'end';
    elems.formBtn.classList.toggle('end-auction');
  }

  function _cleanUpForm () {
    document.getElementById("auction-form").reset(); 
  }

  function _cancelContract () {
    if (!elems.ownerAddress.value) {
      alert('Owner Address required');
      return;
    }

    var opts = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({owner: elems.ownerAddress.value})
    };

    fetch('/auctions/end', opts).then(function (res) {
      return res.json();
    })
    .then(function (jsonRes){
      if(jsonRes.success) {
        alert('Contract cancelled');
        _cleanUpForm();
        let formBtn = document.getElementById('auction-button');
        formBtn.value = 'Start Auction';
        formBtn.dataset.action = 'start';
        formBtn.classList.toggle('end-auction');
      } else {
        console.log('err', jsonRes.error);
        alert(jsonRes.error);
      }
    })
    .catch(err => {
      console.log('err', err);
      alert('Unknown error when closing auction');
    });
  }

  return expose;
})();