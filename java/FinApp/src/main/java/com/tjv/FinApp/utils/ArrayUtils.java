package com.tjv.FinApp.utils;

public class ArrayUtils {
    public static int[] StringToIntArray(String array) {
        String[] tempArray = array.split(",");
        // create new array to hold the int values
        int[] intArray = new int[tempArray.length];
        // cast each String value in place to int
        for (int i = 0; i < tempArray.length; i++) {
            intArray[i] = Integer.parseInt(tempArray[i]);
        }

        return intArray;
    }
}
