//auto expand textarea
function adjust_textarea(h) {
  h.style.height = "20px";
  h.style.height = (h.scrollHeight)+"px";
}

function executeForm() {
  if (!_validateInputs()) {
    return;
  }
  let auctionAction = document.getElementById('auction-button').dataset.action;
  if (auctionAction === 'start') {
    _deployContract();
  }
  if (auctionAction === 'end') {
    _cancelContract();
  }
}

function _validateInputs() {
  if (document.getElementById('auction-url').value &&
    document.getElementById('auction-name').value &&
    document.getElementById('auction-desc').value &&
    document.getElementById('auction-base-price').value &&
    document.getElementById('auction-min-price').value &&
    document.getElementById('auction-max-price').value &&
    document.getElementById('auction-max-offers').value) {
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
  }).then(function (jsonRes){
    if(jsonRes.deployed) {
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
    url: document.getElementById('auction-url').value,
    name: document.getElementById('auction-name').value,
    description: document.getElementById('auction-desc').value,
    basePrice: document.getElementById('auction-base-price').value,
    minPrice: document.getElementById('auction-min-price').value,
    maxPrice: document.getElementById('auction-max-price').value,
    maxOffers: document.getElementById('auction-max-offers').value,
    publicInfo: document.querySelector('input[name="public-info"]:checked').value
  }
  
  return JSON.stringify(auction);
}

function _disableAndHideFields () {
  let publicInfo = document.querySelector('input[name="public-info"]:checked').value;
  if (publicInfo === 'hide') {
    document.getElementById('auction-min-price').value = "private";
    document.getElementById('auction-max-price').value = "private";
    document.getElementById('auction-max-offers').value = "private";
  }
  document.getElementById('auction-url').disabled = true;
  document.getElementById('auction-name').disabled = true;
  document.getElementById('auction-desc').disabled = true;
  document.getElementById('auction-base-price').disabled = true;
  document.getElementById('auction-min-price').disabled = true;
  document.getElementById('auction-max-price').disabled = true;
  document.getElementById('auction-max-offers').disabled = true;
  document.querySelectorAll('input[name="public-info"]').forEach(function (elem, idx, list) {
    elem.disabled = true;
  });

  let formBtn = document.getElementById('auction-button');
  formBtn.value = 'End Auction';
  formBtn.dataset.action = 'end';
  formBtn.classList.toggle('end-auction');
}

function _cleanUpForm () {
  document.getElementById("auction-form").reset(); 
}

function _cancelContract () {
  alert('cancel contract');
}