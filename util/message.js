const generateMessage=(status, data, message)=> {
  return  {
    Status: status,
    Message: message,
    Data: data
  }
}

export{
  generateMessage
}
