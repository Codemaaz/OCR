
function doPost(req) {
    try {
      let data = JSON.parse(req.postData.contents); //Parse the request data
      let dcode64 = Utilities.base64Decode(data.file); //Decode the base64 file data
      let blob = Utilities.newBlob(dcode64, data.type, data.name); //Create a blob from the decoded file data
      let insert = Drive.Files.insert({ //Insert the file into your Google Drive
        title: data.name,
        mimeType: data.type
      }, blob, {
        ocr: true //Enable OCR
      });
      let text = DocumentApp.openById(insert.id).getBody().getText(); //Extract text from the OCR output file
      Drive.Files.remove(insert.id); //Remove the OCR output file
      return ContentService.createTextOutput(text); //Return the extracted text as the response
    } catch (err) {
      return ContentService.createTextOutput(err); //Handle any errors and return as the response
    }
  }
  
      