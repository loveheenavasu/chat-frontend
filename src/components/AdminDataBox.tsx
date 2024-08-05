"use client";
import { Box, Skeleton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../app/adminpanel/admin.module.css";
import axiosInstance from "@/utils/axiosInstance";
import { MdDeleteOutline } from "react-icons/md";

interface ListingData {
  _id: string;
  text: string;
  createdAt: number;
  updatedAt: number;
}

const AdminDataBox = () => {
  const [listingData, setListingData] = useState<ListingData[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const getListingData = async () => {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/text`
    );
    const data = response.data;
    setListingData(data?.data);
    setLoading(false);
  };

  useEffect(() => {
    getListingData();
  }, []);

  const skeletonData = [1, 2, 3, 4];

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/text/${id}`
      );
      const updatedListingData = listingData.filter((item) => item._id !== id);
      setListingData(updatedListingData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <section>
      <Box className={styles.dataBoxWrapper}>
        {loading ? (
          skeletonData.map((ele, i) => (
            <Box
              key={i}
              sx={{ borderRadius: "20px" }}
              className={styles.dataBox}
            >
              <Skeleton height={100} width={"100%"} />
            </Box>
          ))
        ) : listingData.length > 0 ? (
          listingData.map((ele, i) => (
            <Box key={i} className={styles.dataBox}>
              <Box className={styles.dataTextWrapper}>
                <Text>{ele.text}</Text>
              </Box>
              <MdDeleteOutline
                onClick={() => handleDelete(ele._id)}
                fontSize={20}
                className={styles.iconDelete}
              />
            </Box>
          ))
        ) : (
          <Box>No data available</Box>
        )}
      </Box>
    </section>
  );
};

export default AdminDataBox;
