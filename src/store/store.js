// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./auth/authSlice";

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       auth: authReducer,
//     },
//   });
// };

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import featuresReducer from "./features/featuresSlice";
import searchInfluencersReducer from "./searchInfluencers/searchInfluencersSlice";
import globalVariablesReducer from "./globalVariables/globalVariablesSlice";
import brandReducer from "./brand/brandSlice";
import brandsReducer from "./brands/brandsSlice";
import roleReducer from "./role/roleSlice";
import rolesReducer from "./roles/rolesSlice";
import listsReducer from "./lists/listsSlice";
import usersReducer from "./users/usersSlice";
import listReducer from "./list/listSlice";
import discoveryReducer from "./discovery/discoverySlice";
import recentSearchesReducer from "./recentSearches/recentSearchesSlice";
import reportReducer from "./report/reportSlice";
import brandUserRolesReduces from "./brandUserRoles/brandUserRolesSlice";
import campaignReducer from "./campaign/campaignSlice";
import campaignsReducer from "./campaigns/campaignsSlice";
import postsReducer from "./posts/postsSlice";
import postmetricsReducer from "./postmetrics/postmetricsSlice";
import taxanomyReducer from "./taxanomy/taxanomySlice";
import userReducer from "./user/userSlice";
import feedbacksReducer from "./feedback/feedbackSlice";
import subscriptionReducer from "./subscription/subscriptionSlice";
import paymentReducer from "./payment/paymentSlice";
import reportsReducer from "./reports/reportsSlice";
import paymentsReducer from "./payments/paymentsSlice";
import transactionsReducer from "./transactions/transactionsSlice";
import addOnsReducer from "./addOns/addOnsSlice";
import searchCitiesReducer from "./search/searchSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    features: featuresReducer,
    searchInfluencers: searchInfluencersReducer,
    globalVariables: globalVariablesReducer,
    brand: brandReducer,
    brands: brandsReducer,
    brandUserRoles: brandUserRolesReduces,
    campaign: campaignReducer,
    campaigns: campaignsReducer,
    role: roleReducer,
    roles: rolesReducer,
    lists: listsReducer,
    list: listReducer,
    users: usersReducer,
    user: userReducer,
    feedback: feedbacksReducer,
    discovery: discoveryReducer,
    recentSearches: recentSearchesReducer,
    report: reportReducer,
    reports: reportsReducer,
    posts: postsReducer,
    postmetrics: postmetricsReducer,
    taxanomy: taxanomyReducer,
    posts: postsReducer,
    subscription: subscriptionReducer,
    payment: paymentReducer,
    payments: paymentsReducer,
    transactions: transactionsReducer,
    addOns: addOnsReducer,
    search: searchCitiesReducer,
  },
});
