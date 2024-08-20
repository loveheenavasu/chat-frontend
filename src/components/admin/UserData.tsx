// "use client";
// import {
//   Button,
//   Checkbox,
//   CheckboxGroup,
//   Divider,
//   Flex,
//   Heading,
//   Input,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// import React, { useState } from "react";
// import CardContainer from "../cardContainer/CardContainer";

// interface inputTypeProps {
//   fieldName: string;
//   filedType: string;
// }

// const UserData = () => {
//   const [isAddCustom, setIsAddCustom] = useState<boolean>(false);
//   const [inputFields, setInputFields] = useState([
//     { fieldName: "", filedType: "" },
//   ]);

//   const handleFormChange = ((index, e):any) => {
//     const data = [...inputFields];
//     data[index][e.target.name] = e.target.value;
//     setInputFields(data)
//   };

//   const handleAddMore = ()=>{
//     let newField = {fieldName:"",filedType:""}
//     setInputFields([...inputField,newField])
//   }

//   return (
//     <CardContainer
//       border={"1px solid #e2e8f0"}
//       boxShadow={"sm"}
//       borderRadius={"10px"}
//       background=""
//       padding={"15px 20px"}
//       as={false}
//       cursor={"pointer"}
//     >
//       <Stack spacing={5} direction="column" w="100%">
//         <Heading textAlign="center" color="blue">
//           User Data
//         </Heading>

//         <Flex direction="row" w="100%" justifyContent="space-between" p="3">
//           {inputFields.map((item) => {
//             return (
//               <Stack direction="row" gap="4">
//                 <Checkbox defaultChecked>{item.fieldName}</Checkbox>
//                 <Checkbox defaultChecked>Email</Checkbox>
//                 <Checkbox defaultChecked>Phone</Checkbox>
//               </Stack>
//             );
//           })}

//           <Button
//             variant="none"
//             bg="#5188b9"
//             color="white"
//             onClick={() => setIsAddCustom(!isAddCustom)}
//           >
//             Add Custom Field
//           </Button>
//         </Flex>
//       </Stack>
//       <Divider my="10" color="white" />
//       {isAddCustom && (
//         <form action="">
//           <Stack w="100%">
//             {inputFields.map((item, index) => {
//               return (
//                 <Flex w="100%" gap="5" alignItems="center">
//                   <Flex alignItems="center">
//                     <Text w="50%">Field Name :</Text>
//                     <Input
//                       border="1px solid black"
//                       _hover={{}}
//                       value={item.fieldName}
//                       onChange={(e) => handleFormChange(index, e)}
//                     />
//                   </Flex>
//                   <Flex alignItems="center">
//                     <Text w="50%">Field Type :</Text>
//                     <Input
//                       border="1px solid black"
//                       _hover={{}}
//                       value={item.filedType}
//                       onChange={(e) => handleFormChange(index, e)}
//                     />
//                   </Flex>
//                 </Flex>
//               );
//             })}
//             <Button bg="#5188b9" color="white" my="8" _hover={{}} type="submit">
//               Submit
//             </Button>
//           </Stack>
//         </form>
//       )}
//     </CardContainer>
//   );
// };

// export default UserData;
