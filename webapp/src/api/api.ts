import {User, Rock} from '../shared/shareddtypes';

const apiEndPoint =process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

export async function addUser(user:User):Promise<boolean>{
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email, 'dni':user.dni, 'password':user.password, 'repeatPassword': user.repeatPassword})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function getRocas():Promise<Rock[]>{
  let response = await fetch(apiEndPoint+'/rocks/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
} 


export async function getRocksSedimentary():Promise<Rock[]>{
  let response = await fetch(apiEndPoint+'/rocks/list/sedimentary');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getRocksFiery():Promise<Rock[]>{
  let response = await fetch(apiEndPoint+'/rocks/list/fiery');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getRocksMetamorphic():Promise<Rock[]>{
  let response = await fetch(apiEndPoint+'/rocks/list/metamorphic');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getFilteredRocks(mohsMin:Number,mohsMax:Number,densityMin:Number,densityMax:Number,priceMin:Number,priceMax:Number,nameSubString:string):Promise<Rock[]> {
  let response = await fetch(apiEndPoint+'/rocks/list/critery?mohsMin='+mohsMin+"&mohsMax="+mohsMax+"&densityMin="+densityMin+"&densityMax="+densityMax+"&priceMin="+priceMin+"&priceMax"+priceMax+"&nameSubString="+nameSubString);
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function checkUser(email:String,password:String):Promise<boolean>{
  let response = await fetch(apiEndPoint+'/users/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'email':email, 'password':password})
    });
  if (response.status===200)
    return true;
  else
    return false;

}

export async function getDeliveryCosts(address:String):Promise<Number>{
  console.log("BBBBBBBBBBBBBBBBBBBBBBBBB");
  let response = await fetch(apiEndPoint+'/orders/deliveryCosts', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'address':address})
    });
  
  if (response.status===200){
    return response.json();
  }
  else
    return -1;

}