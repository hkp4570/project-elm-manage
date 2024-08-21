import { cityGuess } from '@/api/services';

export default {
  namespaced: true,
  state:{
    city: {},
  },
  mutations:{
    setState(state, data){

    }
  },
  actions:{
    getCity(){
      return new Promise((resolve, reject) => {
        cityGuess().then(resp => {
          console.log(resp ,'resp');
          if (resp.message) {
            reject(resp.message);
          } else {
            resolve(resp)
          }
        })
      })
    }
  }
}
