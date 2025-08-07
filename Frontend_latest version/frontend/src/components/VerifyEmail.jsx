import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../store/slices/userSlice';

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, token]);

  return (
    <div>
      {loading ? (
        <p>Verifying your email...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default VerifyEmail;
