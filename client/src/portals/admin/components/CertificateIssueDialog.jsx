import React from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/common/components/ui/dialog';
import { Button } from '@/common/components/ui/button';
import { ScrollArea } from '@/common/components/ui/scroll-area';

const PaymentDetailsCard = ({ title, details }) => {
  if (!details) return null;

  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 mb-4 border border-zinc-700/50">
      <h4 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">{title}</h4>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="text-zinc-500 block text-xs">Account Holder</span>
          <span className="text-zinc-200 font-medium">{details.accountHolderName || 'N/A'}</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-xs">Bank Name</span>
          <span className="text-zinc-200 font-medium">{details.bankName || 'N/A'}</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-xs">Account Number</span>
          <span className="text-zinc-200 font-medium font-mono">{details.accountNumber || 'N/A'}</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-xs">IFSC Code</span>
          <span className="text-zinc-200 font-medium font-mono">{details.ifscCode || 'N/A'}</span>
        </div>
        <div className="col-span-2 mt-2 pt-2 border-t border-zinc-700/50 flex justify-between items-center">
          <div>
            <span className="text-zinc-500 block text-xs">Transaction ID</span>
            <span className="text-blue-400 font-mono text-xs">{details.transactionId || 'N/A'}</span>
          </div>
          <div className="text-right">
            <span className="text-zinc-500 block text-xs">Amount</span>
            <span className="text-green-400 font-bold">₹{details.amount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateIssueDialog = ({ isOpen, onOpenChange, student, onConfirm, isIssuing }) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Issue Certificate
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Review payment details before issuing the certificate for <span className="text-zinc-200 font-medium">{student.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-2">
          <div className="space-y-4 py-2">
            {/* Course & Payment Summary */}
            <div className="grid grid-cols-2 gap-4 bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <div>
                <span className="text-zinc-500 block text-xs mb-1">Total Course Fee</span>
                <span className="text-xl font-bold text-white">₹{student.courseAmount || 0}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-xs mb-1">Amount Remaining</span>
                <span className={`text-xl font-bold ${student.amountRemaining > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  ₹{student.amountRemaining || 0}
                </span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              {student.partialPaymentDetails ? (
                <PaymentDetailsCard title="Partial Payment Details" details={student.partialPaymentDetails} />
              ) : (
                <div className="text-zinc-500 text-sm italic text-center py-2">No partial payment details available</div>
              )}

              {student.fullPaymentDetails ? (
                <PaymentDetailsCard title="Full Payment Details" details={student.fullPaymentDetails} />
              ) : (
                <div className="text-zinc-500 text-sm italic text-center py-2">No full payment details available</div>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2 pt-4 border-t border-zinc-800">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isIssuing}
            className="border-zinc-700 text-zinc-100 hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(student)}
            disabled={isIssuing}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            {isIssuing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Issuing...
              </>
            ) : (
              'Continue & Issue'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateIssueDialog;
