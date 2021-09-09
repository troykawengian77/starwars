import React, { Component } from 'react';
import axios from 'axios';
import IIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Alert, View, AsyncStorage, StyleSheet, Image, Text, TextInput, ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { width, height, RATIO, FONT } from '../../lib/utils';
import { Container, Picker, Switch } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import CustomHeader from '../../lib/components/CustomHeader';

export default class VehiclesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
            loadMore: true,
            dataCount: 0,
            reqUrl: this.props.url
        }

    }

    async componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    fetchData(dataUrl = null) {
        let url = this.state.reqUrl;
        if (dataUrl) {
            url = dataUrl;
        }
        return (
            axios.get(url)
                .then((response) => {
                    const dataReturn = {
                        status: response.status,
                        object: response.data
                    }
                    return dataReturn
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        )
    }

    async loadData() {
        const dataParams = this.props.dataUrl;
        let dataUrl = JSON.parse(dataParams);
        let results = [];
        if (dataUrl.length > 0) {
            for (let i = 0; i < dataUrl.length; i++) {
                let data = await this.fetchData(dataUrl[i]);
                if (data) {
                    results.push(data.object)
                }
            }
        }
        
        if (results) {
            this.setState({ loaded: true, dataSource: results })
        }
    }

    async componentDidMount() {
        await this.loadData();
    }

    _onRefresh = async () => {
        this.setState({
            refreshing: true,
            loaded: false,
            reqPage: 1
        });
        await this.loadData()
        this.setState({ refreshing: false })
    }

    async handleFilms(dataArr) {
        let dataParams = JSON.stringify(dataArr);
        Actions.filmsPage({ dataUrl: dataParams })
    }

    renderEmpty = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.5 }}>
                <MCIcon name="file-alert-outline" size={20} color="#979797" />
                <Text style={{ fontSize: 20, color: '#979797' }}>
                    Data Empty
                </Text>
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={{ marginBottom: 20 }}  >
                <View style={{ backgroundColor: '#eee', padding: 5 }}>
                    <Text>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <View style={{ width: '30%' }}>
                        <Text>Vehicle Class</Text>
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text>: {item.vehicle_class}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <View style={{ width: '30%' }}>
                        <Text>Manufacturer</Text>
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text>: {item.manufacturer}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <View style={{ width: '30%' }}>
                        <Text>Model</Text>
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text>: {item.model}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { loaded, dataSource } = this.state;
        return (
            <Container>
                <CustomHeader
                    logo={false}
                    left="chevron-back"
                    onLeft={() => Actions.pop()}
                    center={'List Vehicles'}
                    right=""
                />
                {
                    loaded ?
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                            data={dataSource}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderItem}
                            keyExtractor={(s, i) => i.toString()}
                            ListEmptyComponent={() => this.renderEmpty()}
                            style={{ marginBottom: 50, padding: 20 }}
                            ListFooterComponent={
                                <View style={{ height: 50 }}></View>
                            }
                        />
                        :
                        <View style={{ height: height * 0.9, width: '100%' }}>
                            <ActivityIndicator size="large" color="#0996ff" style={{
                                height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'
                            }}
                            />
                        </View>
                }
            </Container>
        )
    }
}

