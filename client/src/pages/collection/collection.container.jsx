import { connect } from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
import CollectionPage from './collection.component'

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state),
})

const mapDispatchToProps = {
    
}
const CollectionPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer;

