import React, { Component } from 'react';
import axios from 'axios';
import IIcon from 'react-native-vector-icons/Ionicons';
import {
    Alert, View, AsyncStorage, StyleSheet, Image, Text, TextInput, ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    RefreshControl
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { width, height, RATIO, FONT } from '../lib/utils';
import { Container, Picker, Switch } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import CustomHeader from '../lib/components/CustomHeader';

export default class DetailsPage extends Component {
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
        const results = await this.fetchData();

        if (results) {
            this.setState({ loaded: true, dataSource: results.object })
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

    async handleSpecies(dataArr) {
        let dataParams = JSON.stringify(dataArr);
        Actions.speciesPage({ dataUrl: dataParams })
    }

    async handleStarship(dataArr) {
        let dataParams = JSON.stringify(dataArr);
        Actions.starshipPage({ dataUrl: dataParams })
    }

    async handleVehicles(dataArr) {
        let dataParams = JSON.stringify(dataArr);
        Actions.vehiclesPage({ dataUrl: dataParams })
    }

    render() {
        const { loaded, dataSource } = this.state;
        
        return (
            <Container>
                <CustomHeader
                    logo={false}
                    left="chevron-back"
                    onLeft={() => Actions.pop()}
                    center={'Detail Page'}
                    right=""
                />
                {
                    loaded ?
                        <View style={{ padding: 10 }}>
                            <View style={{marginBottom: 20}}>
                                <View style={{ backgroundColor: '#eee' }}>
                                    <Text style={{ padding: 10 }}>Profile</Text>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text>Name</Text>
                                    </View>
                                    <View style={{ width: '70%' }}>
                                        <Text>: {dataSource.name}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text>Bod</Text>
                                    </View>
                                    <View style={{ width: '70%' }}>
                                        <Text>: {dataSource.birth_year}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text>Gender</Text>
                                    </View>
                                    <View style={{ width: '70%' }}>
                                        <Text>: {dataSource.gender}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                    <View style={{ width: '30%' }}>
                                        <Text>Height</Text>
                                    </View>
                                    <View style={{ width: '70%' }}>
                                        <Text>: {dataSource.height}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{flexDirection: 'row', marginBottom: 10}}>
                                    <TouchableOpacity onPress={() => this.handleFilms(dataSource.films)} style={{width: '49%', marginRight: '1%', padding: 20, backgroundColor: '#0996ff', alignItems: 'center', borderRadius: 5}}>
                                        <Text style={{color: '#fff'}}>Films</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleSpecies(dataSource.species)} style={{width: '49%', marginLeft: '1%', padding: 20, backgroundColor: '#0996ff', alignItems: 'center', borderRadius: 5}}>
                                        <Text style={{color: '#fff'}}>Species</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row', marginBottom: 10}}>
                                    <TouchableOpacity onPress={() => this.handleStarship(dataSource.starships)} style={{width: '49%', marginRight: '1%', padding: 20, backgroundColor: '#0996ff', alignItems: 'center', borderRadius: 5}}>
                                        <Text style={{color: '#fff'}}>Starship</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.handleVehicles(dataSource.vehicles)} style={{width: '49%', marginLeft: '1%', padding: 20, backgroundColor: '#0996ff', alignItems: 'center', borderRadius: 5}}>
                                        <Text style={{color: '#fff'}}>Vehicles</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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

