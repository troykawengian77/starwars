import React from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { width, height } from './lib/utils'
import { Root } from 'native-base'
import HomePage from './Screen/Home'
import DetailsPage from './Screen/Details'
import FilmsPage from './Screen/Details/Films'
import SpeciesPage from './Screen/Details/Species'
import StarshipPage from './Screen/Details/Starship'
import VehiclesPage from './Screen/Details/Vehicles'

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Root>
                <Router>
                    <Scene hideNavBar key="root">
                        <Scene swipeEnabled={false} key="home" component={HomePage} title="Home" hideNavBar={true} init={true} />
                        <Scene key="detailsPage" component={DetailsPage} title="Details" hideNavBar={true} />
                        <Scene key="filmsPage" component={FilmsPage} title="Films" hideNavBar={true} />
                        <Scene key="speciesPage" component={SpeciesPage} title="Films" hideNavBar={true} />
                        <Scene key="starshipPage" component={StarshipPage} title="Films" hideNavBar={true} />
                        <Scene key="vehiclesPage" component={VehiclesPage} title="Films" hideNavBar={true} />
                    </Scene>
                </Router>
            </Root>
        )
    }
}

export default Routes;