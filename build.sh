npm run build
rm -r ../server/public
mv ./build ../server/public

echo "Press any key to continue"
while [ true ] ; do
read -t 3 -n 1
if [ $? = 0 ] ; then
clear ;
exit ;
else
echo "waiting for the keypress"
fi
done