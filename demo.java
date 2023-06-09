class demo {
    public static void main(String[] args) {
        int[][] arr = {
                { 1, 2, 3, 4 },
                { 1, 2, 3, 4 },
                { 1, 2, 3, 4 },
                { 1, 2, 3, 4 }
        };

        for (int i = 0; i < arr.length; i++) {
            for (int j = 0, k = i; k < arr.length; j++, k++) {
                System.out.print(arr[j][k]);
            }
            System.out.println();
        }

        String s = "Savan";
        String a = s.substring(1, 3 + 1);
        System.out.println(a);
    }
}