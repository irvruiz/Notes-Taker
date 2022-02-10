const uniqueID = () => {
    return Math.floor((Math.random() * 90000) + 50000)
     .toString(24);
 }
 
 module.exports = uniqueID;