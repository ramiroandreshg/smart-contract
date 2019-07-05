var utils = (function () {
  var expose = {};

  expose.initAuction = function () {
    return {
      basePrice: '',
      description: '',
      maxOffers: '',
      maxPrice: '',
      minPrice: '',
      name: '',
      ownerAddress: '',
      publicInfo: 'show',
      url: ''
    }; 
  };

  expose.initBid = function () {
    return {
      amount: '',
      address: ''
    };
  };

  expose.gatherFormElements = function () {
    return {
      url: document.getElementById('auction-url'),
      name: document.getElementById('auction-name'),
      description: document.getElementById('auction-description'),
      basePrice: document.getElementById('auction-base-price'),
      minPrice: document.getElementById('auction-min-price'),
      maxPrice: document.getElementById('auction-max-price'),
      maxOffers: document.getElementById('auction-max-offers'),
      publicInfo: document.querySelector('input[name="public-info"]:checked'),
      ownerAddress: document.getElementById('auction-owner-address'),
      formBtn: document.getElementById('auction-button')
    }
  };

  expose.buildAuction = function (auction) {
    let auctionObj = {
      url: auction.url,
      name: auction.name,
      description: auction.description,
      basePrice: auction.basePrice,
      minPrice: auction.minPrice,
      maxPrice: auction.maxPrice,
      maxOffers: auction.maxOffers,
      publicInfo: auction.publicInfo
    }
    if (auction.ownerAddress) {
      auctionObj.ownerAddress = auction.ownerAddress; 
    }

    return JSON.stringify(auctionObj);
  };

  expose.disableAndHideFields = function (elems) {
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
    elems.formBtn.classList.toggle('end-auction');
  };

  expose.cleanUpForm = function (formId) {
    document.getElementById(formId).reset();
  };
  
  return expose;
})();