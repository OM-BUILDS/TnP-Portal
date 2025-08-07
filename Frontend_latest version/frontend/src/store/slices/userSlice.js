import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { debounce } from 'lodash';
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    message: null,
    studentDetails: {},
    },
  reducers: {
    
    verifyRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    verifySuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    verifyFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    
    requestForAllUsers(state) {
      state.loading = true;
      state.error = null;
    },
    successForAllUsers(state, action) {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    failureForAllUsers(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },

    
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },

    
    fetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },

    
    getStudentDetailsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStudentDetailsSuccess(state, action) {
      state.loading = false;
      state.selectedStudentDetails = action.payload;
      state.error = null;
    },
    fetchStudentDetailsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    
    userUpdateStatus1Request(state) {
      state.loading = true;
      state.error = null;
    },
    lockUnlockUserSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    lockUnlockUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    
    clearAllErrors(state) {
      state.error = null;
      state.user = state.user;
      state.users = state.users;
    },

    
    saveToPlacedStudentsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    saveToPlacedStudentsSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    saveToPlacedStudentsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    
  },

});


export const fetchUsers = (department, yop, programme, searchKeyword = "") => async (dispatch) => {
  try {
    dispatch(userSlice.actions.requestForAllUsers());
    let link = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getall?`;
    let queryParams = [];
    if (searchKeyword) {
      queryParams.push(`searchKeyword=${searchKeyword}`);
    }
    if (department) {
      queryParams.push(`department=${department}`);
    }
    if (yop) {
      queryParams.push(`yop=${yop}`);
    }
    if (programme) {
      queryParams.push(`programme=${programme}`);
    }

    link += queryParams.join("&");
    const response = await axios.get(link, { withCredentials: true });
    dispatch(userSlice.actions.successForAllUsers(response.data.users));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.failureForAllUsers(error.response?.data?.message || "Failed to fetch users"));
  }
};

export const placedStudent = (id, isPlaced) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/placed/${id}`,
      { placed: isPlaced },
      { withCredentials: true }
    );

    
    dispatch(fetchUsers());
    toast.success("User status updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update user status");
  }
};
export const lockedStudent = (id, isLocked) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/locked/${id}`,
      { locked: isLocked },
      { withCredentials: true }
    );

    
    dispatch(fetchUsers());
    toast.success("User status updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update user status");
  }
};

export const lockedStudent1 = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/islocked/${id}`,
      { withCredentials: true }
    );

    const isLocked = response.data.locked; 
    console.log(isLocked);
    dispatch(fetchUsers()); 
    toast.success("User status fetched successfully");
    
    return isLocked; 
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch user status");
    throw error; 
  }
};
export const verifyEmail = (token) => async (dispatch) => {
  dispatch(userSlice.actions.verifyRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/verify-email/${token}`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.verifySuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.verifyFailed(error.response?.data?.message || "Verification failed"));
  }
};

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,
      data,
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response?.data?.message || "Registration failed"));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response?.data?.message || "Login failed"));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed(error.response?.data?.message || "Failed to fetch user"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response?.data?.message || "Logout failed"));
  }
};

export const getStudentDetails = (rollNumber) => async (dispatch) => {
  dispatch(userSlice.actions.getStudentDetailsRequest());
  console.log(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getstudentdetails/${rollNumber}`);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getstudentdetails/${rollNumber}`,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.fetchStudentDetailsSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.fetchStudentDetailsFailed(error.response?.data?.message || "Failed to fetch student details"));
  }
};
export const fetchPlacedStudents = (department, yop, programme, searchKeyword = "") => async (dispatch) => {
  try {
    dispatch(userSlice.actions.requestForAllUsers());
    let link = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getallplaced?`;
    let queryParams = [];
    if (searchKeyword) {
      queryParams.push(`searchKeyword=${searchKeyword}`);
    }
    if (department) {
      queryParams.push(`department=${department}`);
    }
    if (yop) {
      queryParams.push(`yop=${yop}`);
    }
    if (programme) {
      queryParams.push(`programme=${programme}`);
    }

    link += queryParams.join("&");
    const response = await axios.get(link, { withCredentials: true });
   
    dispatch(userSlice.actions.successForAllUsers(response.data.users));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.failureForAllUsers(error.response?.data?.message || "Failed to fetch users"));
  }
};

export const userUpdateStatus1 = (id, lockStatus) => async (dispatch) => {
  dispatch(userSlice.actions.userUpdateStatus1Request());
  console.log(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/lockunlock/${id}`)
  console.log(dispatch);
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/lockunlock/${id}`,
      { locked: lockStatus },
      { withCredentials: true }
    );
    dispatch(userSlice.actions.lockUnlockUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.lockUnlockUserFailed(error.response?.data?.message || "Failed to lock/unlock user"));
  }
};

export const saveToPlacedStudents = (studentDetails) => async (dispatch) => {
  dispatch(userSlice.actions.saveToPlacedStudentsRequest());
  
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/saveToPlacedStudents`,
      studentDetails,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.saveToPlacedStudentsSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.saveToPlacedStudentsFailed(error.response?.data?.message || "Failed to save placed students"));
  }
};


export const forgotPassword = (email) => async (dispatch) => {
  dispatch(userSlice.actions.forgotPasswordRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/forgot-password`,
      { email },
      { withCredentials: true }
    );
    dispatch(userSlice.actions.forgotPasswordSuccess(response.data)); 
    toast.success(response.data.message); 
  } catch (error) {
    dispatch(userSlice.actions.forgotPasswordFailed(error.response?.data?.message || "Password reset failed"));
    toast.error(error.response?.data?.message || "Failed to send reset email");
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
