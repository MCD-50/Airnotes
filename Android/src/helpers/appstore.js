import React, { Component } from "react";
import { AsyncStorage } from "react-native";

export async function getData(key) {
	try {
		return await AsyncStorage.getItem(key);
	} catch (error) {
		return null;
	}
}

export async function setData(key, data) {
	try {
		await AsyncStorage.setItem(key, data);
	} catch (error) {
		console.log(error);
	}
}
