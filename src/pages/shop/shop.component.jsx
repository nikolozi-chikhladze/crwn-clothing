import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import { connect } from 'react-redux'
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot(async snapshot => {
            console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false})
        })
    }

    render () {
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className='shop-page'>
                <Route 
                    path={`${match.path}`}
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}
                    exact
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);


