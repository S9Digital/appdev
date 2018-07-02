// import React from "react";
// import {
//   StackNavigator,
//   addNavigationHelpers,
//   NavigationActions,
//   TabNavigator,
//   TabView,
//   View
// } from "react-navigation";
// import { createStore, applyMiddleware, combineReducers } from "redux";
// import {
//   reduxifyNavigator,
//   createReactNavigationReduxMiddleware
// } from "react-navigation-redux-helpers";
// import { addListener } from "../store";
// import { Provider, connect } from "react-redux";

// export const RootStackNavigator = StackNavigator({});
// class RootNavigator extends React.Component {
// 	static propTypes = {
// 		dispatch: PropTypes.func.isRequired,
// 		navigation: PropTypes.object.isRequired
// 	};
// 	render() {
// 		const navigation = addNavigationHelpers({
// 			dispatch: this.props.dispatch,
// 			state: this.props.navigation,
// 			addListener
// 		});
// 		return <RootStackNavigator navigation={navigation} />;
// 	}
// }

// const mapStateToProps = state => ({
// 	navigation: state.navigation,
// 	params: state.navigation.params
// });

// export default connect(mapStateToProps)(RootNavigator);
