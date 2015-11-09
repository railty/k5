#create and delete Swipe (how to create and delete object in react)
## call createSwiper in componentDidMount and deleteSwiper in componentWillUnmount.
## when restart game, componentWillUnmount will not be called as this is a update
### to force componentWillUnmount, I can render a complete different component (showing loading...) and after an async 1 second, render the painoView. This will destroy the component and therefor call componentWillUnmount.
### or I can deleteSwiper in componentWillUpdate and createSwiper in componentDidUpdate. pianoView has only 1 prop in this case, so it is easy. If there are complicated props, I may have to compare the props with nextProps to know if I should delete and recreate swiper. This become too complicated, as the pos in state, etc...
###I may also use React.unmountComponentAtNode(domElement) to force umount the component and React.renderComponent(<Component />, domElement); this will not work as the domElement seems need to be a root element of react
