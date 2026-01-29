"use client"
import { getUser } from '@/store/slice/userSlice'
import { AppDispatch } from '@/store/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const UseGetUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return null
}

export default UseGetUser