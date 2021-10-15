import React, {useState} from 'react';
import {Button, Text, View, Modal} from 'react-native';

const ModalComponent = () => {
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(modal ? false : true);
  };

  return (
    <View style={{width: '100%'}}>
      <Text>Hello World</Text>
      <Button title="Open Modal" onPress={handleModal} />
      <Modal
        visible={modal}
        animationType={'slide'}
        onShow={() => alert('warning!')}>
        <View style={{marginTop: 60, backgroundColor: 'red'}}>
          <Text>This is modal context</Text>
        </View>
        <Button title="Go Back" onPress={handleModal} />
      </Modal>
    </View>
  );
};

export default ModalComponent;
