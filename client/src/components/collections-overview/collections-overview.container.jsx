import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors'
import CollectionsOverview from './collections-overview.component'
import WithSpinner from '../with-spinner/with-spinner.component'
import {compose} from 'redux'


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching,
})

const mapDispatchToProps = {
    
}

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;

