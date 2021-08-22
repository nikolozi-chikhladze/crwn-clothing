import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {

    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    render () {
        const {match, isCollectionFetching, isCollectionLoaded} = this.props;
        return (
            <div className='shop-page'>
                <Route 
                    path={`${match.path}`}
                    render={(props) => 
                        <CollectionsOverviewWithSpinner 
                            isLoading={isCollectionFetching} 
                            {...props}
                        />
                    }
                    exact
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => 
                        <CollectionPageWithSpinner 
                            isLoading={!isCollectionLoaded} 
                            {...props} 
                        />
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded,
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
})


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);


