import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Stack;

public class Day5_Part2 {
    static String extractInt(String str) {
        str = str.replaceAll("[^0-9]", " ");

        str = str.replaceAll(" +", " ");

        str = str.trim();

        if (str.equals("")) {
            return "-1";
        }

        return str;
    }

    public static void main(String[] args) throws IOException {
        Stack<Character> stack1 = new Stack<>();
        Stack<Character> stack2 = new Stack<>();
        Stack<Character> stack3 = new Stack<>();
        Stack<Character> stack4 = new Stack<>();
        Stack<Character> stack5 = new Stack<>();
        Stack<Character> stack6 = new Stack<>();
        Stack<Character> stack7 = new Stack<>();
        Stack<Character> stack8 = new Stack<>();
        Stack<Character> stack9 = new Stack<>();

        stack1.push('Q');
        stack1.push('S');
        stack1.push('W');
        stack1.push('C');
        stack1.push('Z');
        stack1.push('V');
        stack1.push('F');
        stack1.push('T');

        stack2.push('B');
        stack2.push('R');
        stack2.push('Q');

        stack3.push('B');
        stack3.push('Z');
        stack3.push('T');
        stack3.push('Q');
        stack3.push('P');
        stack3.push('M');
        stack3.push('S');

        stack4.push('D');
        stack4.push('V');
        stack4.push('F');
        stack4.push('R');
        stack4.push('Q');
        stack4.push('H');

        stack5.push('J');
        stack5.push('G');
        stack5.push('L');
        stack5.push('D');
        stack5.push('B');
        stack5.push('S');
        stack5.push('T');
        stack5.push('P');

        stack6.push('W');
        stack6.push('R');
        stack6.push('T');
        stack6.push('Z');

        stack7.push('H');
        stack7.push('Q');
        stack7.push('M');
        stack7.push('N');
        stack7.push('S');
        stack7.push('F');
        stack7.push('R');
        stack7.push('J');

        stack8.push('R');
        stack8.push('N');
        stack8.push('F');
        stack8.push('H');
        stack8.push('W');

        stack9.push('J');
        stack9.push('Z');
        stack9.push('T');
        stack9.push('Q');
        stack9.push('P');
        stack9.push('R');
        stack9.push('B');

        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_5.txt"));

        String line;
        ArrayList<Character> temp = new ArrayList<>();

        while ((line = bufferedReader.readLine()) != null) {
            String[] quantities = line.split("from");
            String[] stackNumbers = quantities[1].split("to");

            String quantity = quantities[0];
            String senderStack = stackNumbers[0];
            String receiverStack = stackNumbers[1];

            int finalQuantity = Integer.parseInt(extractInt(quantity));
            int finalSenderStack = Integer.parseInt(extractInt(senderStack));
            int finalReceiverStack = Integer.parseInt(extractInt(receiverStack));

            while (finalQuantity > 0) {
                if (finalSenderStack == 1) {
                    temp.add(0, stack1.pop());
                } else if (finalSenderStack == 2) {
                    temp.add(0, stack2.pop());
                } else if (finalSenderStack == 3) {
                    temp.add(0, stack3.pop());
                } else if (finalSenderStack == 4) {
                    temp.add(0, stack4.pop());
                } else if (finalSenderStack == 5) {
                    temp.add(0, stack5.pop());
                } else if (finalSenderStack == 6) {
                    temp.add(0, stack6.pop());
                } else if (finalSenderStack == 7) {
                    temp.add(0, stack7.pop());
                } else if (finalSenderStack == 8) {
                    temp.add(0, stack8.pop());
                } else if (finalSenderStack == 9) {
                    temp.add(0, stack9.pop());
                }
                finalQuantity--;
            }

            finalQuantity = Integer.parseInt(extractInt(quantity));
            int i = 0;

            while (finalQuantity > 0) {
                if (finalReceiverStack == 1) {
                    stack1.push(temp.get(i));
                } else if (finalReceiverStack == 2) {
                    stack2.push(temp.get(i));
                } else if (finalReceiverStack == 3) {
                    stack3.push(temp.get(i));
                } else if (finalReceiverStack == 4) {
                    stack4.push(temp.get(i));
                } else if (finalReceiverStack == 5) {
                    stack5.push(temp.get(i));
                } else if (finalReceiverStack == 6) {
                    stack6.push(temp.get(i));
                } else if (finalReceiverStack == 7) {
                    stack7.push(temp.get(i));
                } else if (finalReceiverStack == 8) {
                    stack8.push(temp.get(i));
                } else if (finalReceiverStack == 9) {
                    stack9.push(temp.get(i));
                }
                finalQuantity--;
                i++;
            }

            temp.clear();
        }

        System.out.println(stack1.peek() + "" + stack2.peek() + "" + stack3.peek() + "" + stack4.peek() + "" + stack5.peek() + "" + stack6.peek() + "" + stack7.peek() + "" + stack8.peek() + "" + stack9.peek());
    }
}
