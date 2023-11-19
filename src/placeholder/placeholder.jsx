import React from 'react'
import { Grid,Placeholder,Segment} from "semantic-ui-react";
function placeholder() {
    // Specify the number of Placeholder components you want to create
  const numberOfPlaceholders = 3;

  // Generate an array with the specified length
  const placeholders = Array.from({ length: numberOfPlaceholders }, (_, index) => (
    <Grid.Row key={index} className='placeholder-flex-container'>
      <Segment raised className='placeholder-segment-width'>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='medium' />
            <Placeholder.Line length='short' />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Row>
  ));
  return (
    <div>{placeholders}</div>
  )
}

export default placeholder