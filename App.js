import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Button,
  View,
} from "react-native";

export default function App() {
  const [productList, setproductList] = useState([]);
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const addItem = (newObj) => {
    let newArray = [...productList];
    newArray = newObj;
    setproductList([...productList, newArray]);
  };

  return (
    <>
      <View style={styles.bgContainer}>
        <Text style={styles.appTitle}>Comanda Eletrônica</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.textTitle}>Descrição: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(description) => setDescription(description)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.textTitle}>Quantidade: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(quantity) => setQuantity(quantity)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.textTitle}>Preço: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(price) => setPrice(price)}
        />
      </View>

      <View style={styles.bgContainer}>
        <Button
          title="Adicionar produto"
          color="#E91C5D"
          accessibilityLabel="botão para adicionar produto"
          style={styles.addButton}
          onPress={() => addItem({ description, quantity, price })}
        />
      </View>

      {!productList.length ? (
        <View style={styles.noProductContainer}>
          <Text style={styles.noProductText}>Nenhum produto na lista.</Text>
        </View>
      ) : (
        <FlatList
          data={productList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.tableContainer}>
                <View style={styles.tableItem}>
                  <Text style={styles.tableText}>Descrição</Text>
                  <Text style={styles.tableText}>{item.description}</Text>
                </View>
                <View style={styles.tableItem}>
                  <Text style={styles.tableText}>Quantidade</Text>
                  <Text style={styles.tableText}>{item.quantity}</Text>
                </View>
                <View style={styles.tableItem}>
                  <Text style={styles.tableText}>Preço</Text>
                  <Text style={styles.tableText}>{item.price}</Text>
                </View>
              </View>
            );
          }}
        />
      )}

      {productList.length ? (
        <View style={styles.bgContainer}>
          <Text style={[styles.appTitle, styles.totalPrice]}>
            Total: R${" "}
            {productList
              .map((pr) => Number(pr.price) * pr.quantity)
              .reduce((a, b) => a + b, 0)}{" "}
          </Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    padding: 30,
  },
  appTitle: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#E91C5D",
    color: "#FFF",
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textTitle: {
    fontSize: 16,
    flex: 0.5,
  },
  textInput: {
    flex: 1,
    height: 30,
    borderColor: "#212121",
    borderWidth: 2,
    paddingLeft: 5,
  },
  tableContainer: {
    paddingVertical: 8,
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  tableText: {
    fontSize: 18,
    color: "#000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  addButton: {
    padding: 30,
  },
  totalPrice: {
    textAlign: "right",
  },
  noProductContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  noProductText: {
    fontSize: 24,
    textAlign: "center",
  },
  tableItem: {
    flex: 1,
    padding: 2,
  },
});
