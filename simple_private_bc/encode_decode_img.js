// Require file system access
fs = require('fs');

try {
    // Read file buffer 
    imgReadBuffer = fs.readFileSync('img/test-pattern.jpg');


    // Encode image buffer to hex
    imgHexEncode = new Buffer(imgReadBuffer).toString('hex');

    // Output encoded data to console
    console.log(imgHexEncode);

    // Decode hex
    var imgHexDecode = new Buffer(imgHexEncode, 'hex');

    // Save decoded file file system 
    fs.writeFileSync('img/decodedHexImage.jpg', imgHexDecode);

    //done
} catch (err) {
  console.error(err)
}

