import {userCount,orderCount,adminCount,adminDayCount,getUserCount,getOrderCount} from '@/api/dashboard';
import moment from "moment/moment";

export default {
  namespaced: true,
  state:{

  },
  mutations:{

  },
  actions:{
    async allCount({commit,state}){
      const today = moment().format('YYYY-MM-DD');
      const result = await Promise.all([userCount(today),orderCount(today),adminDayCount(today),getUserCount(),getOrderCount(),adminCount()]);
      return result;
    }
  }
}
