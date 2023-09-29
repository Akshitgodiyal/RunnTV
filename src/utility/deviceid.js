const create_UUID = () => {
    const uiid = localStorage.getItem("deviceid")
    if(uiid == undefined || uiid == null ){
    
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = (dt + Math.random()*16)%16 | 0;
          dt = Math.floor(dt/16);
          return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
    
        localStorage.setItem("deviceid", (uuid))
        return uuid;
      }
    else{
    return uiid
    }

    }

      const myUUID = create_UUID();
    
      export const UUID_CODE = () => { 
   
        
        if (myUUID != undefined && myUUID != null) {
          return myUUID;
        } else {
          return "123456";
        }
      };

      export const deviceType = "DEVICE_TYPE_WEB"